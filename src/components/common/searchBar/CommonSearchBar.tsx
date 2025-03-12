import styles from './CommonSearchBar.module.scss';
import { useState } from 'react';
import * as React from 'react';
import { searchState } from '@/store/atoms/searchState.ts';
import { useSetRecoilState } from 'recoil';
import { pageState } from '@/store/atoms/pageState.ts';

function CommonSearchBar() {
  const setSearch = useSetRecoilState(searchState);
  const setPage = useSetRecoilState(pageState);
  const [text, setText] = useState('');
  const onChange = (event) => {
    setText(event.target.value); // 입력하는 값을 할당하는 방법
  };

  const onSearch = () => {
    if (text === '') {
      // 검색어가 없을 때 -> default 검색
      setSearch('dog');
    } else {
      setSearch(text); // 검색어가 있을 때 -> 검색어로 검색
    }
    setPage(1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (text === '') {
        // 검색어가 없을 때 -> default 검색
        setSearch('dog');
      } else {
        setSearch(text); // 검색어가 있을 때 -> 검색어로 검색
      }
      setPage(1);
    }
  };
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type='text'
          className={styles.searchBar__search__input}
          value={text}
          placeholder='찾으실 이미지를 검색하세요'
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <img
          src='src/assets/icons/icon-search.svg'
          alt='검색 아이콘'
          onClick={onSearch}
        />
      </div>
    </div>
  );
}

export default CommonSearchBar;
