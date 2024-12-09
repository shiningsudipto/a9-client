import { Button, Input } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setSearchOptions,
  useSearchOptions,
} from "../../redux/slices/searchOptions";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchProducts = () => {
  const { searchTerm } = useAppSelector(useSearchOptions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = useState(searchTerm || ""); // Local state for input value

  const setSearchValueToTheSlice = (name: string, value: string) => {
    dispatch(setSearchOptions({ [name]: value }));
    if (pathname !== "/products") navigate("/products");
  };

  const handleSearch = () => {
    setSearchValueToTheSlice("searchTerm", inputValue);
  };

  return (
    <div>
      <div className="relative flex w-full max-w-[24rem]">
        <Input
          crossOrigin={""}
          type="text"
          value={inputValue}
          label="Search products"
          onChange={(e) => setInputValue(e.target.value)}
          className="pr-20 bg-white"
          containerProps={{
            className: "min-w-0",
          }}
        />
        <Button
          size="sm"
          className="!absolute right-1 top-1 rounded"
          onClick={handleSearch} // Trigger search on button click
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchProducts;
