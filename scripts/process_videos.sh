#! /usr/bin/env bash

COLOR_RED="\e[31m"
COLOR_GREEN="\e[32m"
COLOR_YELLOW="\e[33m"
COLOR_END="\e[0m"

PATH_VIDEOS_DIR="./public/videos"
BASE_FILE_EXT="mp4"

print_info() {
  echo -e "[i]: $1"
}

COUNT_UNFINISHED_VARIANTS=4
print_unfinished() {
  i=$2
  variants=("|" "/" "-" "\\")
  echo -e "[${variants[$i]}]: $1"
}

print_success() {
  echo -e "${COLOR_GREEN}[ok]: $1${COLOR_END}"
}

print_error() {
  echo -e "${COLOR_RED}[!]: $1${COLOR_END}"
}

get_file_size_bytes() {
  file=$1
  echo "$(wc -c $file | awk '{print $1}')"
}

get_file_size() {
  file=$1
  echo "$(ls -lah "$file" | awk '{print $5}')"
}

percentage_difference() {
  size1=$1
  size2=$2
  difference=$(echo "$size1 - $size2" | bc -l)
  absolute_difference=$(echo "${difference#-}")
  printf '%.2f\n' $(echo "($absolute_difference/$size1)*100" | bc -l)
}
format_comp_file_sizes() {
  in=$1
  out=$2

  in_size_bytes=$(get_file_size_bytes $in)
  out_size_bytes=$(get_file_size_bytes $out)
  diff=$(($in_size_bytes - $out_size_bytes))

  in_color="$COLOR_YELLOW"
  out_color="$COLOR_YELLOW"
  if [ "$in_size_bytes" -gt "$out_size_bytes" ]; then
    in_color="$COLOR_RED"
    out_color="$COLOR_GREEN"
  elif [ "$out_size_bytes" -gt "$in_size_bytes" ]; then
    out_color="$COLOR_RED"
    in_color="$COLOR_GREEN"
  fi

  echo "$in ($in_color$(get_file_size $in)$COLOR_END) -> $out ($out_color$(get_file_size $out)$COLOR_END) | $out_color${diff}B $(percentage_difference $in_size_bytes $out_size_bytes)%$COLOR_END"
}

check_command_exists() {
  if ! command -v "$1" &>/dev/null; then
    print_error "$1 could not be found"
    exit 1
  else
    print_success "$1 detected"
  fi
}

convert_file_to_ext() {
  file=$1
  ext=$2
  file_converted="${file%.$BASE_FILE_EXT}.$ext"
  echo "$file_converted"
}

convert_to_webm() {
  in=$1
  out=$2

  SVT_LOG=1 ffmpeg -y -i "$in" \
    -c:v libsvtav1 \
    -preset 4 \
    -crf 30 \
    -g 240 \
    -pix_fmt yuv420p10le \
    -svtav1-params tune=0:film-grain=8 \
    -c:a libopus \
    -b:a 128k \
    -b:v 0 \
    -row-mt 1 \
    -tile-columns 2 \
    -tile-rows 1 \
    -lag-in-frames 25 \
    "$out" \
    -hide_banner -loglevel error -nostdin -y
}

generate_video_thumbnail() {
  in=$1
  out=$2

  SVT_LOG=1 ffmpeg -i "$in" \
    -vf "thumbnail,gblur=sigma=50" \
    -frames:v 1 \
    -q:v 10 \
    -f image2 \
    "$out" \
    -hide_banner -loglevel error -nostdin -y
}

process_video() {
  file=$1
  overwrite=$2

  file_as_webm="$(convert_file_to_ext "$file" webm)"
  file_as_thumbnail="$(convert_file_to_ext "$file" webp)"

  if [ ! -f "$file_as_webm" ] || [ "$overwrite" -eq 1 ]; then
    convert_to_webm "$file" "$file_as_webm"
  fi

  if [ ! -f "$file_as_thumbnail" ] || [ "$overwrite" -eq 1 ]; then
    generate_video_thumbnail "$file" "$file_as_thumbnail"
  fi
}

process_videos() {
  overwrite=0
  if [ "$1" -eq 1 ]; then
    echo "Files will be overwritten"
    overwrite=1
  else
    echo "Skipping existing files"
  fi

  check_command_exists ffmpeg

  files_unprocessed=()
  for file in "$PATH_VIDEOS_DIR"/*."$BASE_FILE_EXT"; do
    files_unprocessed+=("$file")
  done

  pids=()
  for i in "${!files_unprocessed[@]}"; do
    file="${files_unprocessed[i]}"
    process_video "$file" "$overwrite" &
    pids+=("$!")
  done

  num_procs="${#files_unprocessed[@]}"
  files_processed=()

  i_loader=0
  while true; do
    i_loader=$((($i_loader + 1) % $COUNT_UNFINISHED_VARIANTS))
    tput reset
    print_info "Progress:"
    for i in "${!files_processed[@]}"; do
      print_success "${files_processed[$i]}"
    done
    for i in "${!files_unprocessed[@]}"; do
      print_unfinished "${files_unprocessed[$i]}" $i_loader
    done

    if [ "${#pids[@]}" -eq 0 ]; then
      break
    fi

    for i in "${!pids[@]}"; do
      pid="${pids[$i]}"

      if ! ps -p "$pid" >/dev/null; then
        wait "$pid"

        unset "pids[$i]"
        file="${files_unprocessed[$i]}"
        files_processed+=("$file")
        unset "files_unprocessed[$i]"

        num_files_processed="${#files_processed[@]}"
        print_success "Completed ($num_files_processed/$num_procs): $file"
      fi
    done

    sleep 0.1
  done

  echo ""
  print_info "${#files_processed[@]} files processed:"
  for i in ${!files_processed[@]}; do
    file="${files_processed[i]}"
    file_as_webm="$(convert_file_to_ext $file webm)"
    file_as_thumbnail="$(convert_file_to_ext $file webp)"
    print_info "$file (Source)"
    print_info "    $(format_comp_file_sizes $file $file_as_webm)"
    print_info "    $file_as_thumbnail $(get_file_size $file_as_thumbnail)"
  done
}

cleanup_processed_files() {
  deleted_count=0

  for file in "$PATH_VIDEOS_DIR"/*."$BASE_FILE_EXT"; do
    file_as_webm="$(convert_file_to_ext "$file" webm)"
    file_as_thumbnail="$(convert_file_to_ext "$file" webp)"

    rm -f "$file_as_webm" "$file_as_thumbnail"

    [ -f "$file_as_webm" ] && print_success "Deleted $file_as_webm" && ((deleted_count++))
    [ -f "$file_as_thumbnail" ] && print_success "Deleted $file_as_thumbnail" && ((deleted_count++))
  done

  print_info "Deleted $deleted_count files."
}

# --- begin options parsing ---
VALID_ARGS=$(getopt -a -n "$0" -o fc --long force,clean -- "$@")
if [[ $? -ne 0 ]]; then
  print_error "No argument provided"
  exit 1
fi

eval set -- "$VALID_ARGS"
while true; do
  case "$1" in
  -f | --force)
    process_videos 1
    exit 0
    ;;
  -c | --clean)
    cleanup_processed_files
    exit 0
    ;;
  --)
    process_videos 0
    break
    ;;
  esac
done
# --- end options parsing ---
