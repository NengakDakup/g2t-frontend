// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, updateDoc, arrayRemove, arrayUnion, query, where, getDocs, getDoc, doc, setDoc, onSnapshot, deleteDoc  } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import {profileData, qualificationData, employmentData, otherQualificationData} from './data'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZjoAoR6LEuuSutK-YycuRdaP2I_owrEM",
  authDomain: "g2t-test.firebaseapp.com",
  projectId: "g2t-test",
  storageBucket: "g2t-test.appspot.com",
  messagingSenderId: "259534688501",
  appId: "1:259534688501:web:ce62e76830cc6d4583f5bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// sign in with email functionality
const signIn = async (email, password) => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
    } catch (err) {
      console.error(err);
      return {error: err.message};
    }
};

// register with email and password
const  signUp = async (name, email, password, userData) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      let docRef = await setDoc(doc(db, "users", user.uid),{
        uid: user.uid,
        name,
        email,
        ...userData
      }, {merge: true});

      //syncing
      // import sample data
      // search within user data fields to get fileds that will be replaced with already existing fields
      // call update profileDtata function

      //department
      let departmentValue = userData.department;
      //Class Of Degree
      let degreeValue = userData.gpa;
      //institution attended
      let institutionTypeValue = userData.institionType;
      //institionName
      let institionNameValue = userData.institionName;
      //year of entry
      let yearOfEntryValue = userData.year_admitted;
      //year of graduation
      let yearOfGraduationValue = userData.year_graduated;
      //matric number
      let matricNumberValue = userData.matric;

      let profileDataToEdit = profileData;
      
      profileData.forEach((data, i) => {
        
        if(data.title === "Course of Study"){
          profileDataToEdit[i].value = departmentValue;
        }
        if(data.title === "Department"){
          profileDataToEdit[i].value = departmentValue;
        }
        if(data.title === "Cumulative Grade Point Average (CGPA)"){
          profileDataToEdit[i].value = degreeValue;
        }
        if(data.title === "Institution Attended"){
          profileDataToEdit[i].value = institutionTypeValue;
        }
        if(data.title === "University Attended" || data.title === "Polytechnic Attended" || data.title === "College Attended"){
          profileDataToEdit[i].value = institionNameValue;
        }
        if(data.title === "Year Of Entry"){
          profileDataToEdit[i].value = yearOfEntryValue;
        }
        if(data.title === "Year Of Graduation"){
          profileDataToEdit[i].value = yearOfGraduationValue;
        }
        if(data.title === "Matriculation Number"){
          profileDataToEdit[i].value = matricNumberValue;
        }
      })

      let res2 = await updateProfileData(user.uid, profileDataToEdit, qualificationData, otherQualificationData, employmentData, [employmentData], [employmentData])
      return res2;

    } catch (err) {
      console.error(err);
      return {error: err.message};
    }
};

// send password reset link to email
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {message: 'Reset Password Link Sent'}
    } catch (err) {
      console.error(err);
      return {error: err.message};
    }
};

// sign out functionality
const logout = () => {
    return auth.signOut();
};

const fetchUserData = async (userID) => {

  try {
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
    let res;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      res = doc.data();
    });
    return res;
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
};

const updateProfileData = async (userID, profileData, qualificationData, otherQualificationData, employmentData, otherEmploymentData, previousEmploymentData) => {

  await setDoc(doc(db, "profiles", userID), {
    profile: profileData,
    qualification: qualificationData,
    employment: employmentData,
    otherEmploymentData: {...otherEmploymentData}, 
    previousEmploymentData: {...previousEmploymentData},
    otherQualificationData: {...otherQualificationData}
  }, {merge: true});
}

const updateProfileImage = async (userID, imageURL) => {
  let res = await setDoc(doc(db, "profiles", userID), {
    imageURL: imageURL
  }, {merge: true});

  let res2 = await setDoc(doc(db, "users", userID), {
    imageURL: imageURL
  }, {merge: true});
  return res;
}

const fetchRecords = async (uid) => {

  const querySnapshot = await getDocs(collection(db, "profiles"));
  let res = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    res.push(doc.data());
  });
  return res;
}

const fetchUsers = async () => {

  const querySnapshot = await getDocs(collection(db, "users"));
  let res = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    res.push(doc.data());
  });
  return res;
}

const fetchUserRecords = async (uid) => {

  const querySnapshot = await getDoc(doc(db, "profiles", uid));
  return querySnapshot.data();
}

const fetchUserFullRecords = async (uid) => {

  let userData = await fetchUserData(uid);
  let userProfileData = await fetchUserRecords(userData.uid);

  return {userData, userProfileData}
}

const uploadImage = async (file, path, uid) => {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  // 'file' comes from the Blob or File API
  let snapshot = await uploadBytes(storageRef, file);
  let url = await getDownloadURL(snapshot.ref);
  let setProfileImage = await updateProfileImage(uid, url);
  return url;
}

const uploadItemImage = async (file, path) => {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  // 'file' comes from the Blob or File API
  let snapshot = await uploadBytes(storageRef, file);
  let url = await getDownloadURL(snapshot.ref);
  return url;
}

const fetchPosts = async () => {

  const querySnapshot = await getDocs(collection(db, "posts"));
  
  let res = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    res.push(data);
  });
  return res;
}

const fetchSinglePost = async (id) => {

  const res = await getDoc(doc(db, "posts", id));
  let users = await fetchUsers();
  let data = res.data();

  data.comments && data.comments.forEach((comment, i) => {
    let newData = {...comment, user: users.find(user => comment.user === user.uid)};
    data.comments[i] = newData;
  })
  return data;
}


const createPost = async (post) => {
  let res = await setDoc(doc(db, "posts", post.id), {
    id: post.id,
    images: post.images,
    title: post.title,
    body: post.body,
    date: post.date,
    user: post.user,
    uid: post.uid
  }, {merge: true});

  let notifRes = await saveNotification('all', 'NEW POST', post.title, `/post/${post.id}`)

  return res;
}

const likePost = async (uid, postID) => {
  let res = await updateDoc(doc(db, "posts", postID), {
    likes: arrayUnion(uid)
  })
  return res;
}

const unlikePost = async (uid, postID) => {
  let res = await updateDoc(doc(db, "posts", postID), {
    likes: arrayRemove(uid)
  })
  return res;
}

const commentPost = async (postID, data) => {
  let res = await updateDoc(doc(db, "posts", postID), {
    comments: arrayUnion(data)
  })
  return res;
}

const deletePost = async (postID) => {
  let res = await deleteDoc(doc(db, "posts", postID))
  return res;
}

const createJobPost = async (job) => {
  let res = await setDoc(doc(db, "jobs", job.id), {
    id: job.id,
    companyImage: job.companyImage,
    image: job.image,
    title: job.title,
    overview: job.overview,
    level: job.level,
    employmentType: job.employmentType,
    location: job.location,
    applicationLink: job.applicationLink,
    requirements: job.requirements,
    companyName: job.companyName,
    date: job.date
  }, {merge: true});

  let notifRes = await saveNotification('all', 'NEW JOB POST', job.title, `/job/${job.id}`)
  return res;
}

const fetchJobPosts = async () => {

  const querySnapshot = await getDocs(collection(db, "jobs"));
  
  let res = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    res.push(data);
  });
  return res;
}

const fetchSingleJobPost = async (id) => {

  const res = await getDoc(doc(db, "jobs", id));
  let data = res.data();
  return data;
}

const deleteJobPost = async (postID) => {
  let res = await deleteDoc(doc(db, "jobs", postID))
  return res;
}

const fetchUserMessages = async (userID, functionToCall) => {
  const q = query(collection(db, "messages"), where("participants", "array-contains", userID));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const res = [];
    querySnapshot.forEach((doc) => {
        res.push(doc.data());
    });
    functionToCall(res);
  });
}

const fetchChatroom = async (user1, user2) => {
  const q = query(collection(db, "messages"), where("participants", "array-contains", user1));
  const querySnapshot = await getDocs(q);
  let res;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    res = doc.data();
  });
  let chatroomData = res.filter(data => {
    return data.participants.includes(user1) && data.participants.includes(user2)
  })
  return chatroomData;
}

const sendNewMessage = async (message, roomID, participants) => {
  let res = await setDoc(doc(db, "messages", roomID), {
    roomID,
    participants,
    messages: arrayUnion(message)
  })
  let notifRes = await saveNotification(participants.find(uid => uid !== message.sender), 'NEW MESSAGE', message.message, `/messages`)
  return res;
}

const sendMessage = async (message, roomID, participants) => {
  let res = await updateDoc(doc(db, "messages", roomID), {
    messages: arrayUnion(message)
  })
  let notifRes = await saveNotification(participants.find(uid => uid !== message.sender), 'NEW MESSAGE', message.message, `/messages`)
  return res;
}

const search = async (query) => {
  let searchQuery = query.toLowerCase();
  const querySnapshotUsers = await getDocs(collection(db, "users"));
  let users = [];
  querySnapshotUsers.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data()
    let name = data.name.toLowerCase()
    if(name.includes(searchQuery)){
      users.push(data)
    }
  });

  const querySnapshotJobs = await getDocs(collection(db, "jobs"));
  let jobs = [];
  querySnapshotJobs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data()
    let title = data.title.toLowerCase()
    if(title.includes(searchQuery)){
      jobs.push(data)
    }
  });
  return {users, jobs};

}

const saveNotification = async (group, title, message, link) => {
  let id = (Math.random().toString(36).substr(2, 9));
  let res = await setDoc(doc(db, "notifications", id), {
    group,
    title,
    id,
    message,
    link,
    readBy: [],
    time: Date.now()
  })
  return res;
}

const fetchNotifications = async (uid) => {
  const querySnapshot = await getDocs(collection(db, "notifications"));
  
  let res = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    res.push(data);
  });
  let notifs = res.filter(noti => (noti.group === 'all' || noti.group === uid))
  let sortedNotifs = notifs.sort((a,b)=>b.time-a.time)
  return sortedNotifs;
}

const readNotification = async (uid, notificationId) => {
  let res = await updateDoc(doc(db, "notifications", notificationId), {
    readBy: arrayUnion(uid)
  })
  return res;
}

const checkMatric = async (matric) => {
  let users = await fetchUsers();
  let userFound = false;
  let userMatric = users.find(user => user.matric.toLowerCase() == matric.toLowerCase())
  if(userMatric){
    return true;
  } else {
    return false;
  }
}

export {
    auth,
    db,
    signIn,
    signUp,
    sendPasswordReset,
    logout,
    fetchUserData,
    updateProfileData,
    fetchRecords,
    fetchUserRecords,
    fetchUserFullRecords,
    uploadImage,
    fetchUsers,
    fetchPosts,
    uploadItemImage,
    createPost,
    fetchSinglePost,
    likePost,
    unlikePost,
    commentPost,
    createJobPost,
    fetchUserMessages,
    fetchChatroom,
    sendMessage,
    sendNewMessage,
    fetchJobPosts,
    fetchSingleJobPost,
    deleteJobPost,
    deletePost,
    search,
    fetchNotifications,
    readNotification,
    checkMatric
};