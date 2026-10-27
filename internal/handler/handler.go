package handler

import (
	"net/http"

	"github.com/letelete/letelete.github.io/templates"
)

type Handler struct{}

func New() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	fileServer := http.FileServer(http.Dir("public"))
	mux.Handle("GET /public/", http.StripPrefix("/public/", fileServer))

	mux.HandleFunc("GET /{$}", h.handleHome)
}

func (h *Handler) handleHome(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	_ = templates.Home().Render(r.Context(), w)
}

