import { createElement, memo as reactMemo, forwardRef } from 'react';
import type {
  FC,
  PropsWithChildren,
  NamedExoticComponent,
  ComponentType,
  ComponentProps,
  MemoExoticComponent,
} from 'react';

import { trackMemo } from 'proxy-compare';

import type {
  Distance,
  Point,
} from './types';

export const getDistance = (
  source?: Point,
  target?: Point,
): Distance | null => {
  if (!source || !target) {
    return null;
  }

  const x = target.x - source.x;
  const y = target.y - source.y;
  const value = Math.sqrt(x * x + y * y);

  return { x, y, value };
};

export const lerp = (v0: number, v1: number, t: number) => (1 - t) * v0 + t * v1;

export const angularLerp = (a0: number, a1: number, t: number) => {
  const max = Math.PI * 2;
  const da = (a1 - a0) % max;
  const shortestAngle = ((2 * da) % max) - da;
  return a0 + (shortestAngle * t);
};

export function memo<P extends Record<string, unknown>>(
  Component: FC<P>,
  propsAreEqual?: (
    prevProps: Readonly<PropsWithChildren<P>>,
    nextProps: Readonly<PropsWithChildren<P>>,
  ) => boolean,
): NamedExoticComponent<P>;

export function memo<T extends ComponentType<any>>(
  Component: T,
  propsAreEqual?: (
    prevProps: Readonly<ComponentProps<T>>,
    nextProps: Readonly<ComponentProps<T>>,
  ) => boolean,
): MemoExoticComponent<T>;

export function memo(Component: any, propsAreEqual?: any) {
  const WrappedComponent = forwardRef((props: any, ref: any) => {
    Object.values(props).forEach(trackMemo);
    return createElement(Component, { ...props, ref });
  });
  return reactMemo(WrappedComponent, propsAreEqual);
}
