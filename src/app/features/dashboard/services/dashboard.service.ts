import { inject, Injectable } from '@angular/core';
import { collection, Firestore, getDocs, limit, orderBy, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly _firestore = inject(Firestore);
  
  constructor() { }

  public getBreadcrumbLabels() {
    return [{ label: 'Dashboard' }];
  }

  public async getFirstDocument(collectionName: string): Promise<any> {
    try {
      const _routineCollection = collection(
        this._firestore,
        collectionName
      );
      const q = query(_routineCollection,orderBy('created', 'desc'), limit(1)); // Consulta con límite de 1 documento

      const querySnapshot = await getDocs(q); // Obtiene la colección

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data(); // Devuelve los datos del primer documento
      } else {
        return null; // Si la colección está vacía
      }
    } catch (error) {
      console.error('Error obteniendo el primer documento:', error);
      throw error;
    }
  }
}
