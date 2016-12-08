/**
 * Created by vuchien on 8/5/16.
 */

export const Paging = {
  ['assign']: (state, data, pagingDes, flagNex) => {
    return {
      ...state.paging,
      totalItem: data.totalItems,
      totalPage: data.totalPage,
      pagingDes,
      flagNextPage: flagNex,
    };
  },
  ['receive'](state, payload) {
    const data = payload.data;
    const itemLength = data.items.length;
    const endItem = (state.paging.beginItem + itemLength) - 1;
    const totalPage = data.totalPage;
    let flagNex = 'false';
    if (state.paging.currentPage < totalPage) {
      flagNex = 'true';
    } else {
      flagNex = 'false';
    }
    return {
      pagingDes: 'Hiển thị ' + state.paging.beginItem + ' - ' + endItem + ' trên ' + data.totalItems + ' bản ghi',
      flagNex,
    };
  },
  count: 0,
  ['setInfo'](state, payload, currentPage) {
    /* retrieve result data to set paging */
    const data = payload.data;
    const totalItemNumber = data.totalItems;
    const totalPage = data.totalPage;
    const pagingItemNumber = payload.pagingItemNumber;

    let infoStartItem = 1; // default = 1 if current page = 1
    if (currentPage > 1) {
      infoStartItem = ((currentPage - 1) * pagingItemNumber) + 1;
    }

    let infoEndItem = pagingItemNumber; // default = 10 if current = 1

    if (currentPage > 1) {
      infoEndItem = ((infoStartItem + pagingItemNumber) - 1);
      if (infoEndItem > totalItemNumber) {
        infoEndItem = totalItemNumber; // set infoEndItem =  totalItemNumber for last item to end
      }
    }

    const pagingDes = 'Hiển thị ' + infoStartItem + ' - ' + infoEndItem + ' trên ' + totalItemNumber + ' bản ghi';

    let flagNex = 'false';
    let flagPrev = 'false';

    /* enable or disable nex, prev button */
    if (currentPage < totalPage) {
      flagNex = 'true';
    } else {
      flagNex = 'false';
    }

    if (currentPage > 1) {
      flagPrev = 'true';
    } else {
      flagPrev = 'false';
    }

    return Object.assign({}, state, data, {
      paging: {
        ...state.paging,
        totalItem: totalItemNumber,
        totalPage: data.totalPage,
        pagingDes,
        flagNextPage: flagNex,
        flagPrePage: flagPrev,
        currentPage,
      },
    });
  },
};
