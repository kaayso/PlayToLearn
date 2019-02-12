import Avatars from './avatar';

const getAvatar = (name) => {
    let avatar; 
    switch (name) {
        case 'User01a' :
            avatar = Avatars.avatars.USER01A;
            break;
        case 'User01b' :
            avatar = Avatars.avatars.USER01B;
            break;
        case 'User01c' :
            avatar = Avatars.avatars.USER01C;
            break;
        case 'User02a' :
            avatar = Avatars.avatars.USER02A;
            break;
        case 'User02b' :
            avatar = Avatars.avatars.USER02B;
            break;
        case 'User02c' :
            avatar = Avatars.avatars.USER02C;
            break;
        case 'User03a' :
            avatar = Avatars.avatars.USER03A;
            break;
        case 'User03C' :
            avatar = Avatars.avatars.USER03C;
            break;
        case 'User04a' :
            avatar = Avatars.avatars.USER04A;
            break;
        case 'User04b' :
            avatar = Avatars.avatars.USER04B;
            break;
        case 'User04c' :
            avatar = Avatars.avatars.USER04C;
            break;
        case 'User05a' :
            avatar = Avatars.avatars.USER05A;
            break;
        case 'User05b' :
            avatar = Avatars.avatars.USER05B;
            break;
        case 'User05c' :
            avatar = Avatars.avatars.USER05C;
            break;
        case 'User06a' :
            avatar = Avatars.avatars.USER06A;
            break;
        case 'User06b' :
            avatar = Avatars.avatars.USER06B;
            break;
        case 'User06c' :
            avatar = Avatars.avatars.USER06C;
            break;
        case 'User07a' :
            avatar = Avatars.avatars.USER07A;
            break;
        case 'User07b' :
            avatar = Avatars.avatars.USER07B;
            break;
        case 'User07c' :
            avatar = Avatars.avatars.USER07C;
            break;
        default:
            avatar = Avatars.avatars.USER02B;
            break;
    }
    return avatar;
};

export default {
    getAvatar
};
