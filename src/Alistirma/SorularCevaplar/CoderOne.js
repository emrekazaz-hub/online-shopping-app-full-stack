/*
1. How to imploement code splittiing in react app (laizy loading nasil ve neden yapilir.)
- Yuksek boyutta bir componenti veya bos yere render edilmesini istemedigimiz bir componenti saf disi etmek icin.
- Yani adi ustunde gec yukleme yapmak. Genelde buyuk projelerde kullanilir.
import olarak :
*/
import React, { lazy, Suspense} from "react"; // lazy kullanilacak fonksiyon, suspense : icerisinde cagirilacak modul

// import Deneme = lazy(() => import ("./Deneme"));
function lazyLoad(){

}


/*
2. Waht is the best way to add global store to project
- 1) Redux
- 2) Zustand

*/


/*
3. React SSR dan ornek ver

1) NEXT.js framework
2) Node
*/

/**
  4. class neden jsx de className
 */


/**
 5. Data flow nasildir.
 - kisaca yukardan asagiya ( unidirectional ) yani parent ve childa dogru gider
 - props ve state dan bahsedebiliriz.
 - bunlari asmak icin context , redux , veya global state tanimlamak olabilir
 */

 /**
  6. Mounted bir componentte nasil delay olarak api call yaparsin?
  - Hook yontemi ile useEffect kullaniriz.
  - Class yontemi ile componentDidMount'da kontrol ederiz. Lifesiclemethots kullaniriz
  */