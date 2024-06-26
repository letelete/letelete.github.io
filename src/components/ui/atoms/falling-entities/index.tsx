'use client';

import { Children, ComponentPropsWithoutRef, useMemo, useRef } from 'react';

import { useAnimationFrameInView } from '~hooks/use-animation-frame-in-view';
import { useElementGeometry } from '~hooks/use-element-geometry';

import { cn } from '~utils/style';

export interface FallingEntitiesProps extends ComponentPropsWithoutRef<'div'> {
  velocity?: number;
  size?: number;
  density?: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Entity {
  position: Position;
}

const FallingEntities = ({
  velocity = 5.0,
  size = 24,
  density = 0.1,
  className,
  children,
  ...rest
}: FallingEntitiesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geometryContainerRef, containerGeometry] =
    useElementGeometry(containerRef);

  const containerWidth = containerGeometry?.width ?? 0;
  const containerHeight = containerGeometry?.height ?? 0;

  const elements = useRef<(HTMLDivElement | null)[]>([]);

  const entities = useMemo(() => {
    const amount = Math.floor(
      ((containerWidth * containerHeight) / Math.pow(size, 2)) * density
    );

    return new Array(amount)
      .fill(null)
      .map(() => getNewRandomEntity(containerWidth, containerHeight, size));
  }, [containerWidth, containerHeight, density, size]);

  const child = Children.only(children);

  useAnimationFrameInView(containerRef, (_time, delta) => {
    elements.current?.forEach((e, idx) => {
      const entity = entities[idx];
      if (entity && e) {
        entity.position.y += (delta / 60) * velocity;

        e.style.transform = `translate(${entity.position.x}px, ${entity.position.y}px)`;

        if (entity.position.y > containerHeight) {
          entity.position = getNewRandomEntity(
            containerWidth,
            containerHeight,
            size
          ).position;
        }
      }
    });
  });

  return (
    <div
      className={cn('relative h-full w-full overflow-hidden', className)}
      ref={geometryContainerRef}
      {...rest}
    >
      {entities.map((_, idx) => {
        return (
          <div
            className='absolute left-0 top-0'
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
            key={idx}
            ref={(e) => (elements.current[idx] = e)}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

FallingEntities.displayName = 'FallingEntities';

function getNewRandomEntity(
  canvasWidth: number,
  canvasHeight: number,
  entitySize: number
) {
  const trackWidth = canvasWidth / entitySize;
  const paddingX = 4;
  const totalTrackWidth = trackWidth + paddingX * 2;

  const rawX = Math.random() * canvasWidth;
  const x =
    Math.max(0, Math.floor(rawX / totalTrackWidth) - 1) * totalTrackWidth +
    paddingX;

  const y = -1 * Math.random() * canvasHeight;

  const entity: Entity = { position: { x, y } };

  return entity;
}

export { FallingEntities as FallingEntities };
