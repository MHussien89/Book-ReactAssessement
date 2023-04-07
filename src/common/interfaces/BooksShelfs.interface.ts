import { Book } from "./Book.interface";

export interface BooksShelfs {
    currentlyReading: Book[],
    wantToRead: Book[],
    read: Book[],
    none: Book[]
}
