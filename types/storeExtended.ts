import { Billboard, Store } from "@prisma/client";

export type StoreExtended = Store & {
  Billboards: Billboard[];
};
