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


export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6;

    let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

    if (filterType) ref = ref.where('productCategory', '==', filterType);

    // If this exists, this means we clicked on "LoadMore"
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc)
    
    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        // console.log(`totalCount: ${totalCount}`)   

        const data = [
          ...persistProducts,
          ...snapshot.docs.map(doc => {
            return {
             ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        // returns an object instead {previously it was an array)
        resolve({
          data,
                // snapshot.docs - gives the complete array of all the documents (6 in this case) from this query 
                // snapshot.docs[totalCount - 1] - this will give us the last element of the array
          queryDoc: snapshot.docs[totalCount - 1],
          // queryDoc: snapshot.docs.length - 1,
          isLastPage: totalCount < 1   // returns a Boolean value
          // isLastPage: totalCount < pageSize
        });
      })
      .catch(err => {
        reject(err)
      })
  })
}



// export const handleFetchProducts = ({ filterType }) => {
//   return new Promise((resolve, reject) => {
//     firestore
//       .collection('products')
//       .orderBy('createdDate')
//       .where('productCategory', '==', filterType)
//       .get()
//       .then((snapshot) => {
//         const productsArray = snapshot.docs.map(doc => {
//           return {
//            ...doc.data(),
//             documentID: doc.id
//           }
//         });
//         resolve(productsArray);
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }


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



export const handleFetchProduct = productID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: productID
          })
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}



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