// src/components/SocialCards.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ajio from './../../assets/images/ajio.png';
import myntra from './../../assets/images/myntra.jpg';
import meesho from './../../assets/images/meesho.jpg';
import flipkart from './../../assets/images/flipkart.jpg';
import Logo from './../../assets/images/logo afri-trading.jpeg';
import indiamart from './../../assets/images/indiamart.png'
import snapdeal from './../../assets/images/snapdeal.png'


import {

    FaAmazon,

} from 'react-icons/fa';
// import { SiMeesho, SiAjio, SiMyntra } from 'react-icons/si'; // brand icons

const SocialCards = () => {
    const cards = [
        {
            icon: <FaAmazon size={50} color="#007bff" />,
            title: 'Amazon',
            text: 'Everything you need—from electronics to groceries.',
            link: 'https://www.amazon.in',
        },
        {
            icon: <img src={flipkart} alt="Flipkart" height="50" />,
            title: 'Flipkart',
            text: 'Leading Indian online marketplace for all your needs.',
            link: 'https://www.flipkart.com',
        },
        {
            icon: <img src={meesho} alt="Meesho" height="50" />,
            title: 'Meesho',
            text: 'Discover trending products at affordable prices on Meesho.',
            link: 'https://www.meesho.com',
        },
        {
            icon: <img src={myntra} alt="Myntra" height="50" />,
            title: 'Myntra',
            text: 'Shop top fashion brands and latest styles on Myntra.',
            link: 'https://www.myntra.com',
        },
        {
            icon: <img src={Logo} alt="Africa Trading Market" height="50" />,
            title: 'Africa Trading Market',
            text: 'Explore Auto Spare Parts',
            link: 'https://auto-spare-parts-users.vercel.app/', // 🔁 replace with actual URL
        },
        {
            icon: <img src={ajio} alt="Ajio" height="50" />,
            title: 'Ajio',
            text: 'Curated fashion collections with great deals at Ajio.',
            link: 'https://www.ajio.com',
        },
        {
            icon: <img src={indiamart} alt="indiamart" height="50" />,
            title: 'IndiaMart',
            text: 'Curated fashion collections with great deals at  IndiaMart.',
            link: 'https://www.indiamart.com',
        },
        {
            icon: <img src={snapdeal} alt="Snapdeal" height="50" />,
            title: 'Snapdeal',
            text: 'Curated fashion collections with great deals at snapdeal.',
            link: 'https://www.snapdeal.com',
        },
    ];



    return (
        <div style={{ backgroundColor: '#f1f1f1', padding: '40px 0' }}>
            <Container>
                <Row className="g-4">
                    {cards.map((card, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card className="text-center shadow-sm p-4 h-100">
                                <div className="mb-3">{card.icon}</div>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Text>{card.text}</Card.Text>
                                <Button
                                    variant="link"
                                    as="a"
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Learn More
                                </Button>

                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default SocialCards;
