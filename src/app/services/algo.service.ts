import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgoService {
  public computeDistanceNamesDP(str1: string, str2: string): number{
    const matrix = [];
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    for (let i = 0; i < str1.length + 1; i ++){
      const newMatrix = [];
      for (let j = 0; j < str2.length + 1; j ++){
        newMatrix.push(0);
      }
      matrix.push(newMatrix);
    }

    for (let i = 0; i < str1.length; i ++){
      for (let j = 0; j < str2.length; j ++){
        if (str1[i] == str2[j]){
          matrix[i+1][j+1] = matrix[i][j] + 1;
        } else {
          matrix[i+1][j+1] = Math.max(matrix[i][j+1],matrix[i+1][j]);
        }
      }
    }

    return matrix[str1.length][str2.length];
  }
}
