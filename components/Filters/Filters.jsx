import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Flex
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { MdArrowRightAlt } from 'react-icons/md';

const Filters = ({
  filters,
  onChangeFilter,
  onActiveFilterChange,
  children
}) => {
  const [selectedFilterOption, setSelectedFilterOption] = useState({});
  const [, setFilterList] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilterList(filters);
    setSelectedFilterOption(filters[0]);
  }, [filters]);

  useEffect(() => {
    const filterFields = searchParams.get('filterFields');
    if (filterFields) {
      const filtersFromUrl = JSON.parse(filterFields);
      if (filtersFromUrl) {
        setActiveFilters(filtersFromUrl);

        if (onActiveFilterChange) {
          onActiveFilterChange(filtersFromUrl);
        }
      }
    }
  }, [searchParams]);

  const update = (newFilters, normalFilters) => {
    const filtersWithPagination = {
      ...newFilters,
      ...(searchParams.get('perPage') && {
        perPage: searchParams.get('perPage')
      })
    };

    if (onChangeFilter === undefined) {
      setSearchParams(filtersWithPagination);
    }

    if (onActiveFilterChange) {
      onActiveFilterChange(normalFilters);
    }

    if (onChangeFilter) {
      onChangeFilter(filtersWithPagination);
    }
  };

  const addFilter = (filter) => {
    setActiveFilters((curFilters) => {
      const filterIndex = curFilters.findIndex(
        (curFilter) =>
          curFilter.field === filter.field && curFilter.value === filter.value
      );

      let newFilters = [...curFilters];
      if (filterIndex === -1) {
        newFilters = [...curFilters, filter];
      }

      update({ filterFields: JSON.stringify(newFilters) }, newFilters);

      return newFilters;
    });
  };

  const removeFilter = (filter) => {
    setActiveFilters((curFilters) => {
      const newFilters = curFilters.filter(
        (curFilter) =>
          (curFilter.field === filter.field &&
            curFilter.value !== filter.value) ||
          (curFilter.field !== filter.field && curFilter.value !== filter.value)
      );

      if (newFilters.length <= 0) {
        update({});
      } else {
        update({ filterFields: JSON.stringify(newFilters) }, newFilters);
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    update({}, []);
    setActiveFilters([]);
  };

  return (
    <Stack direction={['column', 'row']} spacing={3}>
      <MenuContainer
        filterList={filters}
        onChangeFilter={setSelectedFilterOption}
      />
      <FilterOptions onChange={addFilter} filter={selectedFilterOption} />

      {activeFilters.length > 0 && (
        <Flex alignItems='center'>
          <Divider width='10px' height='30px' orientation='vertical' />
          <Wrap align='baseline'>
            <span>Filtros: </span>
            {activeFilters.map((filter, index) => (
              <WrapItem key={index}>
                <Tag
                  key={filter.value}
                  size='sm'
                  maxH='20px'
                  borderRadius={6}
                  variant='solid'
                  colorScheme='blue'
                >
                  <TagLabel>
                    {filter.header}: {filter.optionValue || filter.value}
                  </TagLabel>
                  <TagCloseButton onClick={() => removeFilter(filter)} />
                </Tag>
              </WrapItem>
            ))}
            <Text
              onClick={() => clearFilters()}
              whiteSpace='nowrap'
              color='orange.600'
              fontSize='sm'
              cursor='pointer'
            >
              Limpar filtros
            </Text>
          </Wrap>
        </Flex>
      )}
      {children}
    </Stack>
  );
};

const MenuContainer = ({ filterList, onChangeFilter, depth = 0 }) => {
  const [selectedFilterOption, setSelectedFilterOption] = useState({});
  const [childrenMenu, setChildrenMenu] = useState(null);

  useEffect(() => {
    onChangeFilter(filterList[0]);
    setSelectedFilterOption(filterList[0]);
  }, [filterList]);

  useEffect(() => {
    if (selectedFilterOption.children === undefined) {
      setChildrenMenu(null);
    }
  }, [selectedFilterOption]);

  const selectFilterOption = (filter) => {
    if (filter.children) {
      setChildrenMenu(filter.children);
    }

    setSelectedFilterOption(filter);
    onChangeFilter(filter);
  };

  const isNestedLevel = depth > 0;

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          borderRightRadius={0}
          borderLeftRadius={isNestedLevel && 0}
          style={{
            marginInlineStart: isNestedLevel ? '0px' : 3
          }}
          variant='outline'
          rightIcon={<FiChevronDown />}
          size='sm'
        >
          {selectedFilterOption.header}
        </MenuButton>
        <MenuList>
          {filterList.map((filter) => (
            <MenuItem
              key={`${filter.header}-${filter.field}-${filter.relation}-${depth}`}
              onClick={() => selectFilterOption(filter)}
            >
              <Flex alignItems='center' justifyContent='space-between' w='100%'>
                <span>{filter.header}</span>
                {filter.children && <MdArrowRightAlt />}
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {childrenMenu && (
        <MenuContainer
          filterList={childrenMenu}
          onChangeFilter={onChangeFilter}
          depth={depth + 1}
        />
      )}
    </>
  );
};

const FilterOptions = ({ onChange, filter }) => {
  const [currentOptionSelected, setCurrentOptionSelected] = useState({});
  const [searchFieldText, setSearchFieldText] = useState('');
  const { header, type, options } = filter;

  useEffect(() => {
    if (options) {
      setCurrentOptionSelected(options[0]);
    }
  }, [options]);

  if (type === 'select') {
    return (
      <Menu>
        <MenuButton
          as={Button}
          borderLeftRadius={0}
          variant='outline'
          rightIcon={<FiChevronDown />}
          size='sm'
          style={{ marginInlineStart: 0 }}
        >
          {currentOptionSelected.header}
        </MenuButton>
        <MenuList>
          {options.map((optionFilter) => (
            <MenuItem
              key={optionFilter.value}
              onClick={() => {
                onChange({
                  field: filter.field,
                  header: filter.header,
                  optionValue: optionFilter.header,
                  value: optionFilter.value,
                  relation: filter.relation,
                  serverType: filter.serverType
                });
                setCurrentOptionSelected(optionFilter);
              }}
            >
              {optionFilter.header}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  return (
    <Input
      size='sm'
      style={{ marginInlineStart: 0 }}
      maxW={250}
      borderLeftRadius={0}
      placeholder={`Filtrar por ${header}`}
      value={searchFieldText}
      onChange={(e) => setSearchFieldText(e.target.value)}
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          onChange({ ...filter, value: ev.target.value });
          setSearchFieldText('');
        }
      }}
    />
  );
};

export default Filters;
