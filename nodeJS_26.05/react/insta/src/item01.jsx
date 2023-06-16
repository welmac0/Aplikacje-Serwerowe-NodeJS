const Item = () => {

    const show = () => {
        alert("test")
    }

    return (
        <div>
            <button onClick={show}>show alert</button>
        </div>

    )
}

export default Item