import { useState, type FC } from 'react';
import { Outlet, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AppHeader } from '../../components/AppHeader';
import { SearchContext } from '../../context/search';

export const Component: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  return (
    <SearchContext.Provider value={search}>
      <AppHeader
        onChange={(value) => {
          navigate({
            pathname: '/apps',
            search: value
              ? `?${createSearchParams({
                  search: value,
                })}`
              : '',
          });
          setSearch(value);
        }}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 w-screen max-w-screen-2xl mx-auto">
        <Outlet />
      </div>
    </SearchContext.Provider>
  );
};
