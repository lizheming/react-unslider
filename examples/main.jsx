import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Unslider from '../src';

function App() {
  const sliders = [
    {
      "title": "演员胡歌违法了？",
      "url": "https://360kuai.com/pc/detail?url=http%3A%2F%2Fzm.news.so.com%2F1fa2158f1e16f31a71fd441fe8b6ff19&uid=test_5_3a835d3215755c435ef4fe996&check=b21c5b369a12b31c&sign=look&refer_scene=nh_1",
      "cover": "https://p0.ssl.qhimg.com/dmfd/720_808_/t01bb5d6bb321a1e6f9.jpg"
    },
    {
      "title": "核手提箱内部曝光",
      "url": "https://360kuai.com/pc/detail?url=http%3A%2F%2Fzm.news.so.com%2F57a979be3fa9c69462fae057fbfe27ee&uid=test_5_3a835d3215755c435ef4fe996&check=5594017b173eba38&sign=look&refer_scene=nh_1",
      "cover": "https://p0.ssl.qhimg.com/dmfd/720_808_/t010763b0b6df5e0bdd.jpg",
    },
    {
      "title": "\"东伊运\"恶行曝光",
      "url": "https://360kuai.com/pc/detail?url=http%3A%2F%2Ffawen.news.so.com%2F961743770cd9db03acbba0a1061afc38&uid=test_5_3a835d3215755c435ef4fe996&check=9005b9449f4f6ee9&sign=look&refer_scene=nh_1",
      "cover": "http://p5.qhimg.com/t01bbdee5d68ce47613.jpg",
    },
    {
      "title": "救护车装满免税品",
      "url": "https://360kuai.com/pc/detail?url=http%3A%2F%2Fzm.news.so.com%2F874bd76fb4c2416474ec2a53cfeed43f&uid=test_5_3a835d3215755c435ef4fe996&check=9d51f466d80728f9&sign=look&refer_scene=nh_1",
      "cover": "http://p7.qhimg.com/t01c60d7dea0888a2ea.jpg",
    },
    {
      "title": "尼泊尔“活女神”",
      "url": "https://360kuai.com/pc/detail?url=http%3A%2F%2Fzm.news.so.com%2F9349c843b29505a7c6737bcef3e4b41e&uid=test_5_3a835d3215755c435ef4fe996&check=85bbcb823ab89496&sign=look&refer_scene=nh_1",
      "cover": "http://p9.qhimg.com/t01bf8ecfb485d18f8a.jpg"
    },
    {
      "title": "解放军进驻澳门画面",
      "url": "https://360kuai.com/pc/detail?url=http%3A%2F%2Ffawen.news.so.com%2Fbea10978bd35ff90ad2607f375db6b5c&uid=test_5_3a835d3215755c435ef4fe996&check=5a057840b3257508&sign=look&refer_scene=nh_1",
      "cover": "http://p1.qhimg.com/t0114f409a31beb25c6.jpg"
    }
  ];
  return (
    <Unslider 
      width={300} 
      height={189} 
      autoplay={true} 
      delay={3000}
      infinite={true}
      speed={700}
    >
      {sliders.map((slider, index) => (
        <Unslider.Item key={index}>
          <a
            href={slider.url}
            key={slider.url}
            data-img-ext={index + 1}
            target="_blank"
            rel="noopener noreferrer"
            style={{display:'block', width: 300, height: 189}}
          >
            <img
              src={slider.cover}
              alt={slider.title}
              className="slider__item__cover"
              width={300}
              height={189}
            />
            <div className="slider__item__title">
              <span>{slider.title}</span>
            </div>
          </a>
        </Unslider.Item>
      ))}
    </Unslider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
