// import '../../styles/panel.scss';

const Card = (props) => {

    const {words} = props

    console.log("what is the words", words.word)
    const {word, taboo1, taboo2, taboo3, taboo4, taboo5} = words

    return (
        <div className="card">
            <div backgroundColor="purple">
                {word}
            </div>
            <div backgroundColor="white">
                {taboo1}<br />
                {taboo2}<br />
                {taboo3}<br />
                {taboo4}<br />
                {taboo5}<br />
            </div>

        </div>
    )
}

export default Card;
