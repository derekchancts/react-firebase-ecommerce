import { firestore } from '../../firebase/utils';


export const handleAddProduct = product => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  });
}


export const handleFetchProducts = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .orderBy('createdDate')
      .get()
      .then((snapshot) => {
        const productsArray = snapshot.docs.map(doc => {
          return {
           ...doc.data(),
            documentID: doc.id
          }
        });
        resolve(productsArray);
      })
      .catch(err => {
        reject(err)
      })
  })
}


// export const handleFetchProducts = () => {
//   return new Promise((resolve, reject) => {
//     firestore.collection('products').get()
//       .then((snapshot) => {
//         snapshot.docs.map(doc => {
//           const { 
//             productCategory, 
//             productName, 
//             productThumbnail, 
//             productPrice, 
//             productAdminUserUID,
//             createdDate,
//           } = doc.data()

//           return {
//             productCategory, 
//             productName, 
//             productThumbnail, 
//             productPrice, 
//             productAdminUserUID,
//             createdDate,
//             id: doc.id
//           }

//         });

//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }



export const handleDeleteProduct = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => resolve()
    )
    .catch(err => {
      reject(err)
    })
  })
   
}