import React, { useState } from 'react';

import { Input, Tooltip, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;

const AppTag = ({
  list, setList, selectedList, setSelectedList
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  let inputRef = null;

  const removeItem = (item) => {
    const newList = list.filter((l) => l !== item);
    setList(newList);
  };

  const addItem = () => {
    if (inputValue && !list.find((d) => d === inputValue)) {
      setList([...list, inputValue]);
      setSelectedList([...selectedList, inputValue]);
      setInputValue('');
    }

    setInputVisible(false);
  };

  const showInput = () => {
    setInputVisible(true);
    if (inputRef) inputRef.focus();
  };

  // 行点击选中事件
  const handleSelect = (value, checked) => {
    const newList = checked
      ? [...selectedList, value]
      : selectedList.filter((t) => t !== value);
    setSelectedList(newList);
  };

  return (
    <>
      {list.map((item) => {
        const isLongTag = item.length > 20;
        const tagElem = (
          <CheckableTag
            key={item}
            closable='true'
            onClose={() => removeItem(item)}
            checked={selectedList.includes(item)}
            onChange={(checked) => handleSelect(item, checked)}
            color='#1890ff'
          >
            {isLongTag ? `${item.slice(0, 20)}...` : item}
          </CheckableTag>
        );
        return isLongTag ? (
          <Tooltip title={item} key={item}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}

      <Input
        style={{ width: 78, display: inputVisible ? 'inline' : 'none' }}
        ref={(el) => {
          inputRef = el;
        }}
        type='text'
        size='small'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={addItem}
        onPressEnter={addItem}
      />

      {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <PlusOutlined />
          New Tag
        </Tag>
      )}
    </>
  );
};

export default AppTag;
