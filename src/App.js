import { useEffect, useRef, useCallback, useState } from "react";
import { useSpring, animated, to } from "react-spring";
import "./styles.css";

const MenuItem = () => {
  const [edge, setEdge] = useState();
  const [animate, setAnimate] = useState();
  const linkRef = useRef();
  const itemRef = useRef();
  const marqueeRef = useRef();
  const marqueeInnerRef = useRef();

  const props = useSpring({
    from: { x: edge === "top" ? -100 : 100 },
    x: animate ? 0 : edge === "top" ? -100 : 100
  });

  const dist = useCallback((x1, y1, x2, y2) => {
    const x = x1 - x2;
    const y = y1 - y2;
    return x * x + y * y;
  }, []);
  const closestEdge = useCallback(
    (x, y, w, h) => {
      const topEdgeDist = dist(x, y, w / 2, 0);
      const bottomEdgeDist = dist(x, y, w / 2, h);
      console.log(topEdgeDist, bottomEdgeDist);
      const min = Math.min(topEdgeDist, bottomEdgeDist);
      return min === topEdgeDist ? "top" : "bottom";
    },
    [dist]
  );

  const findClosestEdge = useCallback(
    (ev) => {
      const x = ev.pageX - itemRef.current.offsetLeft;
      const y = ev.pageY - itemRef.current.offsetTop;

      return closestEdge(
        x,
        y,
        itemRef.current.clientWidth,
        itemRef.current.clientHeight
      );
    },
    [closestEdge]
  );
  const handleMouseEnter = useCallback(
    (e) => {
      const edge = findClosestEdge(e);

      setEdge(edge);
      setAnimate(true);
    },
    [findClosestEdge, setAnimate, setEdge]
  );
  const handleMouseLeave = useCallback(
    (e) => {
      const edge = findClosestEdge(e);
      setEdge(edge);
      setAnimate(false);
    },
    [findClosestEdge, setAnimate, setEdge]
  );
  useEffect(() => {
    const link = linkRef.current;
    if (link !== null) {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseLeave]);
  return (
    <div ref={itemRef} className="menu_item">
      <div ref={linkRef} className="menu_item-link">
        Mony
      </div>
      <animated.div
        ref={marqueeRef}
        className="marquee"
        style={{
          transform: props.x.to((x) => `translate3d(0px, ${x}%,0px)`)
        }}
      >
        <animated.div
          ref={marqueeInnerRef}
          className="marquee_inner-wrap"
          style={{
            transform: props.x.to((x) => `translate3d(0px, ${-x}%,0px)`)
          }}
        >
          <div className="marquee_inner">
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Mony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Tony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Sony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Bony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Nony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Mony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Tony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Sony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Bony</span>
            <div
              className="marquee_img"
              style={{
                backgroundImage: `url("https://picsum.photos/seed/picsum/200/300")`
              }}
            ></div>
            <span>Nony</span>
          </div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default function App() {
  return (
    <div className="menu_wrap">
      <div className="menu">
        {Array(10)
          .fill(0)
          .map((_, i) => {
            return <MenuItem key={i} />;
          })}
      </div>
    </div>
  );
}
