import { MainRoute } from 'src/app/app.type';

export function getMainRouteLink(route: MainRoute): string[] {
  return [...getRootRouteLink(), route];
}

export function getRootRouteLink(): string[] {
  return ['/', 'main'];
}
