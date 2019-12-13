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

  it("setSubCategoryList should set a normalized list of sub categories to the subCategoryState and increments the corresponding offset by 2", () => {
    expect(
      subCategoryReducer(
        undefined,
        setSubCategoryList(listSubCategoriesResponse)
      )
    ).toEqual({
      parentNotebooksOfSubCategories: {
        "1": {
          listOffset: 2,
          subCategories: {
            "1": {
              id: 1,
              notebook_id: 1,
              title: "SubCategory1",
              topic_id_list: [1, 2],
            },
            "2": {
              id: 2,
              notebook_id: 1,
              title: "SubCategory2",
              topic_id_list: [],
            },
          },
          subCategoriesPaginationEnd: true,
        },
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
    console.log(
      "subCategoryReducer(stateWithSubCategories, setCreatedSubCategory(createSubCategoryResponse)):"
    )
    console.log(
      subCategoryReducer(
        stateWithSubCategories,
        setCreatedSubCategory(createSubCategoryResponse)
      )
    )
    console.log("expecting it to be:")
    console.log({
      parentNotebooksOfSubCategories: {
        "1": {
          listOffset: 3,
          subCategories: {
            "1": {
              id: 1,
              notebook_id: 1,
              title: "SubCategory1",
              topic_id_list: [1, 2],
            },
            "2": {
              id: 2,
              notebook_id: 1,
              title: "SubCategory2",
              topic_id_list: [],
            },
            "3": {
              id: 3,
              notebook_id: 1,
              title: "SubCategory3",
              topic_id_list: [],
            },
          },
          subCategoriesPaginationEnd: true,
        },
      },
      listSharedSubCategoriesOffset: 0,
      sharedSubCategories: {},
      createSubCategoryError: null,
      subCategoryListError: null,
      listSharedSubCategoriesError: null,
    })
    expect(
      subCategoryReducer(
        stateWithSubCategories,
        setCreatedSubCategory(createSubCategoryResponse)
      )
    ).toEqual({
      parentNotebooksOfSubCategories: {
        "1": {
          listOffset: 3,
          subCategories: {
            "1": {
              id: 1,
              notebook_id: 1,
              title: "SubCategory1",
              topic_id_list: [1, 2],
            },
            "2": {
              id: 2,
              notebook_id: 1,
              title: "SubCategory2",
              topic_id_list: [],
            },
            "3": {
              id: 3,
              notebook_id: 1,
              title: "SubCategory3",
              topic_id_list: [],
            },
          },
          subCategoriesPaginationEnd: true,
        },
      },
      listSharedSubCategoriesOffset: 0,
      sharedSubCategories: {},
      createSubCategoryError: null,
      subCategoryListError: null,
      listSharedSubCategoriesError: null,
    })
  })
})
