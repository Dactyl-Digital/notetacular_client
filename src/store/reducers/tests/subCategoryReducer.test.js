import subCategoryReducer, {
  subCategoryInitialState,
} from "../subCategoryReducer"
import {
  setCreatedSubCategory,
  setCreateSubCategoryError,
  setSubCategoryList,
} from "../../actions/subCategory"
import {
  createSubCategoryResponse,
  listSubCategoriesResponse,
} from "../../../test_fixture_data"

describe("subCategoryReducer", () => {
  it("should return the initial state", () => {
    expect(subCategoryReducer(undefined, { data: {} })).toEqual(
      subCategoryInitialState
    )
  })

  it("setSubCategoryList should set a normalized list of sub categories to the subCategoryState and increments the corresponding offset by 20", () => {
    expect(
      subCategoryReducer(
        undefined,
        setSubCategoryList(listSubCategoriesResponse)
      )
    ).toEqual({
      listSubCategoriesOffset: 20,
      subCategories: {
        "1": { id: 1, title: "SubCategory1", topic_id_list: [1, 2] },
        "2": { id: 2, title: "SubCategory2", topic_id_list: [] },
      },
      listSharedSubCategoriesOffset: 0,
      sharedSubCategories: {},
      createSubCategoryError: null,
      subCategoryListError: null,
      listSharedSubCategoriesError: null,
    })
  })

  it("setCreatedSubCategory should append a newly created sub category to the normalized sub categories", () => {
    const stateWithSubCategories = subCategoryReducer(
      undefined,
      setSubCategoryList(listSubCategoriesResponse)
    )
    expect(
      subCategoryReducer(
        stateWithSubCategories,
        setCreatedSubCategory(createSubCategoryResponse)
      )
    ).toEqual({
      listSubCategoriesOffset: 20,
      subCategories: {
        "1": { id: 1, title: "SubCategory1", topic_id_list: [1, 2] },
        "2": { id: 2, title: "SubCategory2", topic_id_list: [] },
        "3": { id: 3, title: "SubCategory3", topic_id_list: [] },
      },
      listSharedSubCategoriesOffset: 0,
      sharedSubCategories: {},
      createSubCategoryError: null,
      subCategoryListError: null,
      listSharedSubCategoriesError: null,
    })
  })
})
