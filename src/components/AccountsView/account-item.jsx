export default function AccountItem({account, setAccount}) {

    const randomColor = () => {
        const color = "#" + (Math.floor(Math.random()*16777215).toString(16));
        return color
    }

    return (
        <div onClick={setAccount} className="account-item_wrapper">
            <div className="account-backdrop"
                 style={{backgroundColor: randomColor()}}
                 >
                    {
                        account.type === 'pups' ?
                        <p className="img">Pups</p> :
                        <p className="img initial">{account.name.split('')[0]}</p> 
                    }
                 </div>
            <h5>{account.name}</h5>
            <p>{account.type}</p>
        </div>
    )
}