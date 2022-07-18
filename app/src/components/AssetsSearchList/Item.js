import { NavLink } from 'react-router-dom';

function SearchListItem(props) {
    const { data, links } = props.data;
    return (
        <NavLink to={"/asset/" + data[0].nasa_id} >
            {data[0].media_type === 'image' && <thumbnail style={{ backgroundImage: `url("` + links[0].href + `")` }}></thumbnail>}
            {data[0].media_type === 'audio' && <thumbnail className="audioMediaIcon">▶</thumbnail>}
            {data[0].media_type === 'video' && <thumbnail className="audioMediaIcon" style={{ backgroundImage: `url("` + links[0].href + `")` }}>▶</thumbnail>}
            <info>
                <h3>{data[0].title}</h3>
                {data[0].photographer && <p>📸 Photographer: {data[0].photographer}</p>}
                {data[0].location && <p>📍 Location: {data[0].location}</p>}
                <p>📼 {data[0].media_type}</p>
            </info>
        </NavLink>
    )
}

export default SearchListItem;