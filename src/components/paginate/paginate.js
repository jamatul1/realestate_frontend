import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;
const Button = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  background-color: ${(props) => (props.active ? "var(--blue)" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "var(--grayDark)")};
  border: 1px solid ${(props) => props.theme.color.whiteDark};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.1s linear;
`;

export default function Paginate({
  total,
  currentPage,
  setPage,
  maxIncrement = 5,
  parentRef,
}) {
  const [maxIncre, setMaxIncre] = useState(0);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    setMaxIncre(maxIncrement);
    setEnd(maxIncrement > total ? total : maxIncrement);
  }, [total, maxIncrement]);
  //handeling the normal page button
  const handlePagination = (page) => {
    setPage(page);
    scrollToTargetAdjusted();
  };

  //render general buttons
  function renderButtons(start, end) {
    return arrayFrom(start, end).map((page, i) => (
      <Button
        key={i}
        active={currentPage === page}
        onClick={() => handlePagination(page)}
      >
        {page}
      </Button>
    ));
  }

  // for incrementing a step at the right side
  function maxIncrementRight() {
    let s = start;
    if (start + maxIncre <= total) {
      setStart(s + maxIncre);
      if (s + maxIncre * 2 <= total) {
        setEnd(s + maxIncre * 2 - 1);
      } else {
        setEnd(total);
      }
    }
  }
  // for decrementing a step at the left side
  function maxDecrementLeft() {
    let s = start;
    if (start - maxIncre >= 0) {
      setStart(s - maxIncre);
      if (s + maxIncre * 2 >= 0) {
        setEnd(s - 1);
      } else {
        setEnd(1);
      }
    }
  }

  // handling the scroll after every press in the button
  function scrollToTargetAdjusted() {
    var element = parentRef.current;
    var headerOffset = 200;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  return (
    <Container>
      {start - maxIncre > 0 && (
        <Button onClick={maxDecrementLeft}>{"<"}</Button>
      )}
      {total > 1 && renderButtons(start, end)}
      {total - start > maxIncre && (
        <Button style={{ cursor: "none" }} disabled>
          ...
        </Button>
      )}
      {total - start >= maxIncre && (
        <Button
          active={currentPage === total}
          onClick={() => handlePagination(total)}
        >
          {total}
        </Button>
      )}
      {total - start > maxIncre && (
        <Button onClick={maxIncrementRight}>{">"}</Button>
      )}
    </Container>
  );
}

function arrayFrom(start, end) {
  let array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}
