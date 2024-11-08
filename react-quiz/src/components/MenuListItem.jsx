import ListItem from "./ListItem";

export default function MenuListItem({
  mouseLeave,
  mouseEnter,
  mouseOver,
  itemClick,
}) {
  return (
    <>
      <ListItem
        color="dot-red"
        type="html"
        key={0}
        keyNumb={0}
        mouseEnter={mouseEnter}
        mouseLeave={mouseLeave}
        mouseOver={mouseOver}
        itemClick={itemClick}
      />
      <ListItem
        color="dot-blue"
        type="css"
        key={1}
        keyNumb={1}
        mouseEnter={mouseEnter}
        mouseLeave={mouseLeave}
        mouseOver={mouseOver}
        itemClick={itemClick}
      />
      <ListItem
        color="dot-yellow"
        type="javascript"
        key={2}
        keyNumb={2}
        mouseEnter={mouseEnter}
        mouseLeave={mouseLeave}
        mouseOver={mouseOver}
        itemClick={itemClick}
      />
      <ListItem
        color="dot-light-blue"
        type="react"
        key={3}
        keyNumb={3}
        mouseEnter={mouseEnter}
        mouseLeave={mouseLeave}
        mouseOver={mouseOver}
        itemClick={itemClick}
      />
    </>
  );
}
