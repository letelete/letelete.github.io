import { Player, PlayerEvent } from '@lottiefiles/react-lottie-player';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface AsyncLottiePlayerProps
  extends ComponentPropsWithoutRef<typeof Player> {}

/**
 * Spawns a next instance of Lottie player if the previous `play` call hasn't finished.
 */
const AsyncLottiePlayer = forwardRef<Player, AsyncLottiePlayerProps>(
  ({ style, ...rest }, ref) => {
    const playerRefs = useRef<Player[]>([]);
    const [id, setId] = useState(0);
    const [playerInstances, setPlayerInstances] = useState([id]);

    useImperativeHandle(ref, () => {
      const playableInstance = playerRefs.current[playerInstances.length - 1]!;

      const proxy = new Proxy(playableInstance, {
        get(target, prop, receiver) {
          if (prop === 'play') {
            const nextInstanceId = id + 1;
            setId(nextInstanceId);
            setPlayerInstances((instances) => [...instances, nextInstanceId]);
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return Reflect.get(target, prop, receiver);
        },
      });

      return proxy;
    });

    return playerInstances.map((instanceId, index) => (
      <Player
        {...rest}
        key={instanceId}
        onEvent={(e) => {
          if ([PlayerEvent.Complete, PlayerEvent.Pause].includes(e)) {
            setPlayerInstances((instances) =>
              instances.filter((id) => id === instanceId)
            );
          }
        }}
        ref={(ref) => {
          if (ref) {
            playerRefs.current[index] = ref;
          }
        }}
        style={{
          ...style,
          zIndex: index,
        }}
      />
    ));
  }
);

AsyncLottiePlayer.displayName = 'AsyncLottiePlayer';

export { AsyncLottiePlayer };
