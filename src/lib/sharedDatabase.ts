import { CRUDService } from "@/lib/CRUDService";
import { AnyObject } from "@/domain/types/types";

const sharedDatabase = new CRUDService<AnyObject>();

export { sharedDatabase };
