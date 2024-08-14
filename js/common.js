import config from "../config/apikey.js";

const DECODING_API_KEY = config.ABANDONMENTPUBLICSRVC_DECODING_API_KEY;
const ENCODING_API_KEY = config.ABANDONMENTPUBLICSRVC_ENCODING_API_KEY;

const $grid1 = document.getElementById("grid1");
const $grid2 = document.getElementById("grid2");
const $topBtn = document.querySelector(".topBtn");
const $city = document.getElementById("city");
const $district = document.getElementById("district");
const $species = document.getElementById("species");
const $cultivar = document.getElementById("cultivar");
const $loader = document.querySelector(".loader");

// section 1 url
let url1 = new URL(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic`
);
// select 1 url
let url2 = new URL(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?numOfRows=20&pageNo=1&_type=json&serviceKey=${ENCODING_API_KEY}`
);
// select 2 url
let url3 = new URL(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?_type=json&serviceKey=${ENCODING_API_KEY}`
);
// select 4 url
let url4 = new URL(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/kind?_type=json&serviceKey=${ENCODING_API_KEY}`
);
let url5 = new URL(
    `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic`
);

const today = getToday();

// util 함수들
function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
    // return "20240812";
}

const getDate = (str) => {
    return str
        ? str.replace(/(\d{4})(\d{2})(\d{2})/g, "$1.$2.$3")
        : "접수 날짜 없음";
};

const getDate2 = (str) => {
    return str
        ? str.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")
        : "접수 날짜 없음";
};

const getDate3 = (str) => {
    return str
        ? str.replace(/(\d{4})(\d{2})(\d{2})/g, "$1년 $2월 $3일")
        : "접수 날짜 없음";
};

// modal
const makeModal = (target, index) => {
    const lists = target === 1 ? list1 : list2;
    const ani = lists[index];

    let popfile = ani.popfile || "./img/No_Image.jpg";
    let noticeNo = ani.noticeNo || "공고번호 없음";
    let title = ani.kindCd || "제목없음";
    let period = getDate2(ani.noticeSdt) + " ~ " + getDate2(ani.noticeEdt);
    let kindCd = ani.kindCd.slice(ani.kindCd.indexOf(" ") + 1) || "정보 없음";
    let sexCd =
        ani.sexCd === "M" ? "수컷" : ani.sexCd === "F" ? "암컷" : "미상";
    let age = ani.age || "정보 없음";
    let colorCd = ani.colorCd || "정보 없음";
    let weight = ani.weight || "정보 없음";
    let processState = ani.processState || "정보 없음";
    let happenDt = getDate3(ani.happenDt);
    let happenPlace = ani.happenPlace || "발견 장소 없음";
    let careNm = ani.careNm || "정보 없음";
    let careAddr = ani.careAddr || "정보 없음";
    let careTel = ani.careTel || "정보 없음";
    let orgAndCharge =
        (ani.orgNm || "(기관 정보없음)") +
        " - " +
        (ani.chargeNm || "(담당자 정보없음)");
    let officetel = ani.officetel || "정보 없음";

    const docFrag = document.createDocumentFragment();
    const $modalBg = document.createElement("section");
    $modalBg.classList.add("modalBg");
    $modalBg.innerHTML = `
		<section class="modalBg">
            <div class="modal">
                <section class="m_top">
                    <div class="m_img">
                        <img src="${popfile}" alt="동물 이미지" />
                    </div>
                    <div class="m_desc">
                        <p class="m_num">${noticeNo}</p>
                        <p class="m_title">${title}</p>
                        <p class="m_period">보호기간 <span>${period}</span></p>
                        <div class="m_contents">
                            <div class="m_list">
                                <p class="m_list_l">품종</p>
                                <p class="m_list_r">${kindCd}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">성별</p>
                                <p class="m_list_r">${sexCd}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">나이</p>
                                <p class="m_list_r">${age}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">색상</p>
                                <p class="m_list_r">${colorCd}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">체중</p>
                                <p class="m_list_r">${weight}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">상태</p>
                                <p class="m_list_r">${processState}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">접수일시</p>
                                <p class="m_list_r">${happenDt}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">발견장소</p>
                                <p class="m_list_r">${happenPlace}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">보호센터</p>
                                <p class="m_list_r">${careNm}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l"></p>
                                <p class="m_list_r">
                                    ${careAddr}
                                </p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l"></p>
                                <p class="m_list_r">${careTel}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l">담당자</p>
                                <p class="m_list_r">${orgAndCharge}</p>
                            </div>
                            <div class="m_line"></div>
                            <div class="m_list">
                                <p class="m_list_l"></p>
                                <p class="m_list_r">${officetel}</p>
                            </div>
                            <div class="m_line"></div>
                        </div>
                    </div>
                </section>
                <div id="map"></div>
            </div>
        </section>
	`;
    docFrag.appendChild($modalBg);
    document.querySelector("body").appendChild(docFrag);

    //kakao.js가 load 되었을 때 지도 생성, 안그럼 오류 발생함.
    window.kakao.maps.load(() => {
        // 카카오맵 api로 보호소 위치 보여주기
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3, // 지도의 확대 레벨
            };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(careAddr, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${careNm}</div>`,
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    });

    // modal 탈출하기
    $modalBg.addEventListener("click", (e) => {
        if (e.target.className === "modalBg") $modalBg.remove();
    });
};

// 항목이 없을 때 보여줄 화면
const renderNoList = (num) => {
    const target = num === 1 ? $grid1 : $grid2;
    const docFrag = document.createDocumentFragment();
    let urlToImage = "./img/No_Image.jpg";
    let title = "아직 데이터가 없어요!";
    const $li = document.createElement("li");
    $li.classList.add("list");
    $li.innerHTML = `
        <div class="aniImg">
            <img src="${urlToImage}" alt="동물 이미지" />
        </div>
        <div class="l1">
            <div>
                <p class="title alone">${title}</p>
            </div>
        </div>
	`;
    docFrag.appendChild($li);
    target.innerHTML = ``;
    target.appendChild(docFrag);
};

// section 1
const renderGrid1 = () => {
    const docFrag = document.createDocumentFragment();
    list1.forEach((list, i) => {
        let urlToImage = list.popfile || "./img/No_Image.jpg";
        let title = list.kindCd || "제목없음";
        let found = getDate(list.happenDt);
        let num = list.noticeNo || "공고번호 없음";
        let location = list.happenPlace || "발견 장소 없음";
        let period = getDate(list.noticeSdt) + "~" + getDate(list.noticeEdt);
        const $li = document.createElement("li");
        $li.classList.add("list");
        $li.innerHTML = `
			<div class="aniImg">
                <img src="${urlToImage}" alt="동물 이미지" />
            </div>
        	<div class="l1">
                <div>
                    <p class="title">${title}</p>
                    <i class="fa-solid fa-${
                        list.sexCd === "M"
                            ? "mars"
                            : list.sexCd === "F"
                            ? "venus"
                            : "question"
                    }"></i>
                </div>
                <p class="found">${found}</p>
            </div>
            <p class="num">${num}</p>
            <i class="fa-solid fa-location-dot"></i>
			<p class="location">${location}</p>
			<div class="l2">
				<i class="fa-solid fa-calendar-days"></i>
				<p class="date">${period}</p>
			</div>
			<button class="more" onClick='makeModal(${1},${i})'>자세히보기</button>
		`;
        docFrag.appendChild($li);
    });
    $grid1.innerHTML = ``;
    $grid1.appendChild(docFrag);
};

// 페이지네이션
let pageSize = 8; // 한번에 보여줄 항목 수
let totalResults = 0; // 목록의 리스트 항목 수
let groupSize = 5; // 페이지네이션 버튼 수
let currentPage = 1; // 현재 페이지 번호
const pagination = () => {
    let pageGroup = Math.ceil(currentPage / groupSize);
    let totalPage = Math.ceil(totalResults / pageSize); // 전체 페이지 개수
    let lastPage = Math.min(totalPage, pageGroup * groupSize); //
    let firstPage = (pageGroup - 1) * groupSize + 1;
    let prevGroup = (pageGroup - 2) * groupSize + 1;
    let nextGroup = pageGroup * groupSize + 1;

    let paginationHtml = `<button class="prev1" ${
        pageGroup === 1 ? "disabled" : ""
    } onClick='fetchGrid1(${prevGroup})'>이전페이지그룹</button>`;

    paginationHtml += `<button class="prev1" ${
        currentPage === 1 ? "disabled" : ""
    } onClick='fetchGrid1(${currentPage - 1})'>이전</button>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHtml += `<button class="${
            i === currentPage ? "on" : ""
        }" onClick='fetchGrid1(${i})'>${i}</button>`;
    }

    paginationHtml += `<button class="next1" ${
        currentPage === totalPage ? "disabled" : ""
    } onClick='fetchGrid1(${currentPage + 1})'>다음</button>`;

    paginationHtml += `<button class="next1" ${
        pageGroup * groupSize >= totalPage ? "disabled" : ""
    } onClick='fetchGrid1(${nextGroup})'>다음페이지그룹</button>`;

    document.querySelector(".pg1").innerHTML = paginationHtml;
};

// section 1 ul 렌더링
let list1;
const fetchGrid1 = async (page = 1) => {
    try {
        url1.searchParams.set("state", "notice");
        url1.searchParams.set("bgnde", today);
        url1.searchParams.set("endde", today);
        url1.searchParams.set("pageNo", page);
        url1.searchParams.set("numOfRows", pageSize);
        url1.searchParams.set("_type", "json");
        url1.searchParams.set("serviceKey", DECODING_API_KEY);

        const res = await fetch(url1);
        const data = await res.json();
        list1 = data.response.body.items.item || [];
        totalResults = data.response.body.totalCount;
        currentPage = page;

        if (list1.length === 0) {
            renderNoList(1);
        } else {
            renderGrid1();
            pagination();
        }
    } catch (e) {
        console.error(e);
    }
};

// topBtn
let isScrolling = false;
const scrollToTop = () => {
    if (isScrolling) return;
    isScrolling = true;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
};

$topBtn.addEventListener("click", () => {
    scrollToTop();
});

// select 각각의 option들을 생성
let select1;
const resetSelect1 = () => {
    $city.innerHTML = `
        <option value="null" selected>시/도 선택</option>
    `;
    select1.forEach((option) => {
        $city.innerHTML += `
            <option value="${option.orgCd}">${option.orgdownNm}</option>
        `;
    });
};
const initSelect1 = async () => {
    try {
        const res = await fetch(url2);
        const data = await res.json();
        select1 = data.response.body.items.item || [];
        resetSelect1();
    } catch (e) {
        console.error(e);
    }
};

// 시/도 선택시, 시/군/구 select 태그에 option들 생성
let select2;
const getSelect2 = async () => {
    try {
        $district.innerHTML = `<option value="null" selected>시/군/구 선택</option>`;
        if ($city.selectedIndex === 0) return;
        url3.searchParams.set(
            "upr_cd",
            $city.options[$city.selectedIndex].value
        );
        const res = await fetch(url3);
        const data = await res.json();
        select2 = data.response.body.items.item || [];
        select2.forEach((option) => {
            $district.innerHTML += `
                <option value="${option.orgCd}">${option.orgdownNm}</option>
            `;
        });
    } catch (e) {
        console.error(e);
    }
};
$city.addEventListener("change", () => {
    getSelect2();
    // 자동 리렌더링
    fetchGrid2();
});

$district.addEventListener("change", () => {
    // 자동 리렌더링
    fetchGrid2();
});

// 개/고양이 선택시, 품종 select 태그에 option들 생성
let select4;
const getSelect4 = async () => {
    try {
        $cultivar.innerHTML = `<option value="null" selected>품종 선택</option>`;
        if ($species.selectedIndex === 0) return;
        url4.searchParams.set(
            "up_kind_cd",
            $species.options[$species.selectedIndex].value
        );
        const res = await fetch(url4);
        const data = await res.json();
        select4 = data.response.body.items.item || [];
        select4.forEach((option) => {
            $cultivar.innerHTML += `
                <option value="${option.kindCd}">${option.knm}</option>
            `;
        });
    } catch (e) {
        console.error(e);
    }
};
$species.addEventListener("change", () => {
    getSelect4();
    // 자동 리렌더링
    fetchGrid2();
});

$cultivar.addEventListener("change", () => {
    // 자동 리렌더링
    fetchGrid2();
});

// section 2 ul 렌더링
let pageCount;
let list2;
let target;
let index;
// 무한스크롤 변수
let isFetching = false;
let hasMore = true;

// grid2 li 요소 추가 및 렌더링
const renderGrid2 = () => {
    const docFrag = document.createDocumentFragment();
    target.forEach((list) => {
        let urlToImage = list.popfile || "./img/No_Image.jpg";
        let title = list.kindCd || "제목없음";
        let found = getDate(list.happenDt);
        let num = list.noticeNo || "공고번호 없음";
        let location = list.happenPlace || "발견 장소 없음";
        let period = getDate(list.noticeSdt) + "~" + getDate(list.noticeEdt);
        const $li = document.createElement("li");
        $li.classList.add("list");
        $li.innerHTML = `
			<div class="aniImg">
                <img src="${urlToImage}" alt="동물 이미지" />
            </div>
        	<div class="l1">
                <div>
                    <p class="title">${title}</p>
                    <i class="fa-solid fa-${
                        list.sexCd === "M"
                            ? "mars"
                            : list.sexCd === "F"
                            ? "venus"
                            : "question"
                    }"></i>
                </div>
                <p class="found">${found}</p>
            </div>
            <p class="num">${num}</p>
            <i class="fa-solid fa-location-dot"></i>
			<p class="location">${location}</p>
			<div class="l2">
				<i class="fa-solid fa-calendar-days"></i>
				<p class="date">${period}</p>
			</div>
			<button class="more" onClick='makeModal(${2},${index})'>자세히보기</button>
		`;
        docFrag.appendChild($li);
        index++;
    });
    $grid2.appendChild(docFrag);
};

// grid2 ul 초기화
const fetchGrid2 = async () => {
    try {
        isFetching = true;
        pageCount = 1;
        const cityValue = $city.options[$city.selectedIndex].value;
        const districtValue = $district.options[$district.selectedIndex].value;
        const speciesValue = $species.options[$species.selectedIndex].value;
        const cultivarValue = $cultivar.options[$cultivar.selectedIndex].value;
        cityValue === "null"
            ? url5.searchParams.delete("upr_cd")
            : url5.searchParams.set("upr_cd", cityValue);
        districtValue === "null"
            ? url5.searchParams.delete("org_cd")
            : url5.searchParams.set("org_cd", districtValue);
        speciesValue === "null"
            ? url5.searchParams.delete("upkind")
            : url5.searchParams.set("upkind", speciesValue);
        cultivarValue === "null"
            ? url5.searchParams.delete("kind")
            : url5.searchParams.set("kind", cultivarValue);
        url5.searchParams.set("pageNo", pageCount);
        url5.searchParams.set("numOfRows", pageSize);
        url5.searchParams.set("_type", "json");
        url5.searchParams.set("serviceKey", DECODING_API_KEY);

        list2 = [];
        index = 0;
        hasMore = true;

        const res = await fetch(url5);
        const data = await res.json();
        target = data.response.body.items.item || [];
        target.forEach((element) => {
            list2.push(element);
        });
        pageCount++;

        $grid2.innerHTML = ``;
        list2.length === 0 ? renderNoList(2) : renderGrid2();

        isFetching = false;
    } catch (e) {
        console.error(e);
    }
};

// init
initSelect1();
fetchGrid1();
fetchGrid2();

// 무한스크롤
window.addEventListener("scroll", async () => {
    try {
        if (isFetching || !hasMore) {
            return;
        }
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 10
        ) {
            isFetching = true;
            $loader.classList.add("show");

            url5.searchParams.set("pageNo", pageCount);
            const res = await fetch(url5);
            const data = await res.json();

            target = data.response.body.items.item || [];
            target.forEach((element) => {
                list2.push(element);
            });
            if (target.length === 0) {
                hasMore = false;
            }
            pageCount++;

            renderGrid2();
            isFetching = false;
            $loader.classList.remove("show");
        }
    } catch (e) {
        console.error(e);
    }
});
