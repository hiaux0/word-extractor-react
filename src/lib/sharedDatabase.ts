import { CRUDService } from "@/lib/CRUDService";
import { IWordEntry } from "@/domain/types/types";

const sharedDatabase = new CRUDService<IWordEntry>();

export { sharedDatabase };
