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
        showElement(userInfo);
    }else{
        login();
    }
}

showElement = (element) => element.style.display ='black';
hideElement = (element) => element.style.display ='none';

const userConnectButton = document.getElementById('btnConnect');
userConnectButton.onclick = login;
const userProfileButton = document.getElementById('btnUserInfo');

userProfileButton.onclick = openUserInfo;

const userInfo = document.getElementById('userInfo');
document.getElementById('btnCloseUserInfo').onclick = ()=> hideElement(userInfo);

document.getElementById('btnLogout').onclick = logout;


init();
