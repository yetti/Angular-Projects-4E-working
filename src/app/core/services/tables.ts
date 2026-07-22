import { inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';

@Service()
export class TablesService {
  private readonly firestore = inject(Firestore);
  private readonly tableCol = collection(this.firestore, 'tables');
  readonly tables = toSignal(collectionData(this.tableCol), {
    initialValue: [] as DocumentData[],
  });
}
