import { inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  collection,
  collectionData,
  doc,
  DocumentData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';

@Service()
export class TablesService {
  private readonly firestore = inject(Firestore);
  readonly tableCol = collection(this.firestore, 'tables');
  readonly tables = toSignal(collectionData(this.tableCol), {
    initialValue: [] as DocumentData[],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateTable(no: number, data: any) {
    const tableDoc = doc(this.tableCol, no.toString());
    await updateDoc(tableDoc, data);
  }
}
