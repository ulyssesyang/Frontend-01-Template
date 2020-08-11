import { createElement, Wrapper, Text } from './lib/createElement';
import Carousel from './components/Carousel';
import TabPanel from './components/Panel';
import ListView from './components/ListView';

let data1 = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

let carouselComponent = <Carousel data={data1} />

carouselComponent.mountTo(document.body);

let panelComponent = <TabPanel>
    <span title='title1'>This is content1</span>
    <span title='title2'>This is content2</span>
    <span title='title3'>This is content3</span>
    <span title='title4'>This is content4</span>
</TabPanel>

panelComponent.mountTo(document.body);

let data2 = [
    {
        title: 'blue cat',
        url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    },
    {
        title: 'orange cat',
        url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    },
    {
        title: 'color cat',
        url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    },
    {
        title: 'mix cat',
        url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    },
]

let listComponent = <ListView data={data2}>
    {
        record => <figure>
                    <img src={record.url} />
                    <figcaption>{record.title}</figcaption>
                </figure>
    }
</ListView>

listComponent.mountTo(document.body);