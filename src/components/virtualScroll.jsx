import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';


/*
itemHeight: 每一项的高度
visibleItemCount 可见的项数
*/


// 虚拟滚动组件
function VirtualScroll({ data, itemHeight, visibleItemCount }) {
    const containerRef = useRef(null);
    const [startIndex, setStartIndex] = useState(0);
    const visibleItems = data.slice(startIndex, startIndex + visibleItemCount);

    useEffect(() => {
        const container = containerRef.current;
        console.log('container', container);
        const handleScroll = () => {
            const { scrollTop } = container;
            const index = Math.floor(scrollTop / itemHeight);
            setStartIndex(index);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [itemHeight]);





    // return (
    //     <div
    //         ref={containerRef}
    //         style={{ height: `${visibleItemCount * itemHeight}px`, overflow: 'auto' }}
    //     >
    //         <div style={{ height: `${data.length * itemHeight}px`, paddingTop: `${startIndex * itemHeight}px` }} >
    //             {/* style={{ height: `${data.length * itemHeight}px`, paddingTop: `${startIndex * itemHeight}px` }} */}
    //             {visibleItems.map((item, index) => (
    //                 <div key={startIndex + index} style={{ height: `${itemHeight}px` }}>{item}</div>//style={{ height: `${itemHeight}px` }}
    //             ))}
    //         </div>
    //     </div>
    // );

    return (
        <Container
            ref={containerRef}
            visibleItemCount={visibleItemCount}
            itemHeight={itemHeight}
        >
            <Content
                data={data}
                startIndex={startIndex}
                itemHeight={itemHeight}
            >
                {visibleItems.map((item, index) => (
                    <Item key={startIndex + index} itemHeight={itemHeight}>{item}</Item>
                ))}
            </Content>
        </Container>
    );

}


// const Container = styled.div`
//   height: ${({ visibleItemCount, itemHeight }) => visibleItemCount * itemHeight}px;
//   overflow: auto;
// `;

// const Content = styled.div`
//   height: ${({ data, itemHeight }) => data.length * itemHeight}px;
//   padding-top: ${({ startIndex, itemHeight }) => startIndex * itemHeight}px;
// `;

// const Item = styled.div`
//   height: ${({ itemHeight }) => itemHeight}px;
// `;

const Container = styled.div.attrs(({ visibleItemCount, itemHeight }) => ({
    style: {
      height: `${visibleItemCount * itemHeight}px`,
      overflow: 'auto',
    },
  }))``;
  
  const Content = styled.div.attrs(({ data, startIndex, itemHeight }) => ({
    style: {
      height: `${data.length * itemHeight}px`,
      paddingTop: `${startIndex * itemHeight}px`,
    },
  }))``;
  
  const Item = styled.div.attrs(({ itemHeight }) => ({
    style: {
      height: `${itemHeight}px`,
    },
  }))``;
//通过 attrs 方法，我们为 div 元素添加了一个 style 属性，其中的样式对象根据组件的 props 进行动态设置。
//这样就可以将经常变化的样式直接应用于组件，而无需生成大量的类名
export default VirtualScroll;
