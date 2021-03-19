import Button from "../forms/Button";


const LoadMore = ({
  onLoadMoreEvt = () => {},
  isLastPage
}) => {
  return (
    // <Button disabled={isLastPage} onClick={() => onLoadMoreEvt()}>
    <Button onClick={() => onLoadMoreEvt()}>
      Load More
    </Button>
  );
}
 
export default LoadMore;