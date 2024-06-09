export default function reducer(state={
            typeUser:"user",
            signed:false,
            rool_no : '',
            password:'',
            email_id:'',
            clubs_registered:[],
            profile_pic:''
        },action)
        {
            
            switch(action.type)
            {
                case 'login':
                    const now = new Date();
                    const expireTime = now.getTime() + 10*60 * 1000; // 600 seconds
                    now.setTime(expireTime);
                    document.cookie = `rool_no=${action.rool_no}; expires=${now.toUTCString()}; path=/;`;

                    return { ...state, signed: true, rool_no: action.rool_no};
                case 'club_login':
                    now.setTime(expireTime);
                    let type_user = "clubAdimin";
                    document.cookie = `rool_no=${action.rool_no}; expires=${now.toUTCString()}; path=/;`;
                    document.cookie = `type=${type_user}; expires=${now.toUTCString()}; path=/;`;

                    return { ...state, signed: true, rool_no: action.rool_no,typeUser:type_user};

                    
                case 'add_clubs':
                    return {...state, clubs_registered : action.clubs}
                case 'check_is_signed':
                    let cookieData = document.cookie.split(';')
                    for(let x in cookieData)
                    {
                        // console.log(cookieData[x])

                        cookieData[x] = cookieData[x].split('=')
                        if(cookieData[x][0] == ' rool_no')
                        {
                            if(cookieData[x][1] != '' && cookieData[x][1] != undefined)
                            {
                                // console.log(cookieData[x])
                                return {...state,rool_no:cookieData[x][1],signed:true}
                            }
                        }
                    }
                default :
                    return state

            }
        }