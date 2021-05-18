Moralis.initialize("YOUR_APP_ID");

Moralis.serverURL = 'https://YOUR_MORALIS_SERVER:1337/server';

//In this upper portion we will create a server instance to login into the NFT Market Place


init = async () =>{
    hideElement(userProfileButton);
    window.web3 = await Moralis.web3.enable();
    initUser();
}

initUser= async () =>{
    if(await Moralis.User.current()){
        hideElement(userConnectButton);
        showElement(userProfileButton);
    }
    else{
        showElement(userConnectButton);
        hideElement(userProfileButton);
    }
}

login = async () => {
    try{
        await Moralis.web3.authenticate();
        initUser();
    }
    catch(error){
        alert(error)
    }
}

logout = async () => {
    await Moralis.user.logout();
    hideElement(userInfo);
    initUser();
}


openUserInfo = async () =>{
    user = await Moralis.User.current();
    if (user){
        const email = user.get('email');
        if(email){
            userEmailField.value = email;
        }else{
            userEmailField.value = "";
        }

        userUsernameField.value = user.get('username');


        const userAvatar = user.get('avatar');
        if(userAvatar){
            userAvatarImg.src= userAvatar.url();
            showElement(userAvatarImg);
        }else{
            hideElement(userAvatarImg);
        }


        showElement(userInfo);
    }else{
        login();
    }
}

saveUserInfo = async () =>{
    user.set('email',userEmailField.value);
    user.set('username',userUsernameField); // will add the check error for the username here

if (userAvatarFile.files.length > 0) {
  
  const avatar = new Moralis.File('avatar.jpg', userAvatarFile.files[0]);
  //only jpeg files will work here
  user.set('avatar', avatar)

}
await user.save();
alert(' Your info is saved soldier');
openUserInfo();



}

showElement = (element) => element.style.display ='black';
hideElement = (element) => element.style.display ='none';

const userConnectButton = document.getElementById('btnConnect');
userConnectButton.onclick = login;
const userProfileButton = document.getElementById('btnUserInfo');

userProfileButton.onclick = openUserInfo;

const userInfo = document.getElementById('userInfo');
const userUsernameField = document.getElementById('txtUsername');
const userEmailField = document.getElementById('txtEmail');
const userAvatarImg = document.getElementById('imgAvatar');
const userAvatarFile = document.getElementById('fileAvatar');




document.getElementById('btnCloseUserInfo').onclick = ()=> hideElement(userInfo);

document.getElementById('btnLogout').onclick = logout;
document.getElementById('btnSaveUserInfo').onclick = saveUserInfo;


init();
