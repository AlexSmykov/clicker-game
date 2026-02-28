import { ObjectType } from 'src/app/core/types/common.type';
import { MAIN_ROUTE_IDS } from 'src/app/app.const';

export type MainRoute = ObjectType<typeof MAIN_ROUTE_IDS>;

export type MainRouteData = { name: string; iconPath: string };
