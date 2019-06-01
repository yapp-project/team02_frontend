import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";
import { connect } from "react-redux";
import Header from "./Function/Header";
import Left from "./Function/Left";
import Middle from "./Function/Middle";
import Step1 from "./Function/Step1";
import Step2 from "./Function/Step2";
import Step3 from "./Function/Step3";
import Done from "./Function/Done";
import { enrolmentRequest } from "../../action/enrolmentAction";
import axios from "axios";
import { ChromePicker } from "react-color";
import { recipeIDRequest } from "../../action/recipeAction";
import { CircleSpinner } from "react-spinners-kit";

import cup_empty1 from "../../static/images/glass1_empty_enrolment.png";
import cup_empty2 from "../../static/images/glass2_empty_enrolment.png";
import cup_empty3 from "../../static/images/glass3_empty_enrolment.png";
import cup_empty4 from "../../static/images/glass4_empty_enrolment.png";
import cup_empty5 from "../../static/images/glass5_empty_enrolment.png";

import cup_full1 from "../../static/images/glass1_full_enrolment.png";
import cup_full2 from "../../static/images/glass2_full_enrolment.png";
import cup_full3 from "../../static/images/glass3_full_enrolment.png";
import cup_full4 from "../../static/images/glass4_full_enrolment.png";
import cup_full5 from "../../static/images/glass5_full_enrolment.png";

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    state: state.enrolmentReducer.state,
    result: state.enrolmentReducer.result,
    recipe_info: state.recipeReducer.recipe_info,
    stuffs: state.recipeReducer.stuffs,
    photos: state.recipeReducer.photos
  };
};

const mapDispatchToProps = { enrolmentRequest, recipeIDRequest };

let colorTarget = "";

class Enrolment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: "",
      middle: "",
      step: "",
      done: "",
      enrolmentData: {
        info: { cup: "하이볼", name: "", describe: "", alcohol: 0, tags: "" },
        stuff: [{ color: "#4d191a", name: "", ml: "", ratio: 0 }],
        totalVolume: 0
      },
      stuffID: 0,
      color_idx: "",
      images: [],
      userID: "",
      colorClose: "",
      bLoading: false
    };

    this.onChangeStepStatus = this.onChangeStepStatus.bind(this);
    this.onChangeCup = this.onChangeCup.bind(this);
    this.onChangeCup = this.onChangeCup.bind(this);
    this.onChangeAlcohol = this.onChangeAlcohol.bind(this);
    this.onSaveDescribe = this.onSaveDescribe.bind(this);
    this.onSaveTags = this.onSaveTags.bind(this);
    this.onAddStuff = this.onAddStuff.bind(this);
    this.onSaveRecipe = this.onSaveRecipe.bind(this);
  }

  selectStep;
  doneClose;
  contents;
  inputTarget;

  componentDidMount() {
    //사용자 인증!
    const auth = JSON.parse(localStorage.getItem("myData")); //localstorage에서 가져옴
    if (auth) {
      this.setState({ userID: auth.userid });
    } else {
      alert("회원만 등록 가능합니다.");
      this.props.history.goBack();
      return false;
    }

    document.addEventListener("DOMContentLoaded", () => {
      // this.selectCup = document.querySelector(".cup-item1").classList[1];
      // console.log(this.selectCup);
      this.selectAlcohol = document.querySelector(
        ".alcohol-item1"
      ).classList[1];
      this.doneClose = document.querySelector("#done-container").classList[1];
      this.inputTarget = document.querySelectorAll(
        "#recipe-name, #recipe-descripe, #recipe-tag"
      );
    });
    this.selectStep = document.querySelector(".step-1").classList[1];

    this.contents = [
      {
        title: "INPUT INFO",
        detail:
          "나만의 레시피 만들기 첫번째 단계! 레시피에 어울리는 컵을 선택하고, 정보를 입력해주세요."
      },
      {
        title: "PUT INGREDIENT",
        detail:
          "나만의 레시피 만들기 두번째 단계! 레시피에 들어갈 재료를 순서대로 추가하고, 완료되면 ‘Shake Me!’ 버튼을 클릭해주세요."
      },
      {
        title: "ADD PICUTRES",
        detail:
          "나만의 레시피 만들기 마지막 단계! 직접 만든 음료를 사진으로 찍어 등록하고, 썸네일 사진을 골라주세요."
      }
    ];

    this.setState({
      left: <Left contents={this.contents[0]} />,
      middle: <Middle />,
      step: (
        <Step1
          onChangeCup={this.onChangeCup}
          onChangeAlcohol={this.onChangeAlcohol}
          onSaveName={this.onSaveName}
          onSaveDescribe={this.onSaveDescribe}
          onSaveTags={this.onSaveTags}
          info={this.state.enrolmentData.info}
        />
      ),
      done: <Done onDoneClose={this.onDoneClose} />
    });

    const recipeID = this.props.match.params.id;
    if (recipeID) {
      this.props.recipeIDRequest(recipeID);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let info = this.state.enrolmentData.info;
    let stuff = this.state.enrolmentData.stuff;

    if (info.name !== "" && info.describe !== "" && info.tags.tags !== "") {
      let stuffCheck = true;

      stuff.forEach(val => {
        if (val.name === "" || val.ml === "") stuffCheck = false;
      });

      if (stuffCheck) {
        document.getElementById("saveRecipe").style.opacity = 1;
      } else {
        document.getElementById("saveRecipe").style.opacity = 0.2;
      }
    } else {
      document.getElementById("saveRecipe").style.opacity = 0.2;
    }

    if (prevProps.result === undefined && this.props.state === "success") {
      this.onUploadImage(this.state.images, this.props.result._id);
      // 이미지 데이터를 제외한 나머지 등록 정보가 서버에 잘 반영되면 여기 분기문으로 들어옴
      // 즉, 이제 이미지 업로드 실행!
    }

    const recipeID = this.props.match.params.id;
    if (recipeID) {
      if (this.props.recipe_info && !this.state.enrolmentData.info.name) {
        const glass = this.props.recipe_info.glass;
        let cup = "하이볼";
        switch (glass) {
          case 1:
            cup = "리큐르";
            break;
          case 2:
            cup = "허리케인";
            break;
          case 3:
            cup = "마가렛";
            break;
          case 4:
            cup = "마티니";
            break;
          default:
            break;
        }
        const info = {
          cup,
          name: this.props.recipe_info.cocktail,
          describe: this.props.recipe_info.description,
          alcohol: this.props.recipe_info.alcohol,
          tags: this.props.recipe_info.tags
            .toString()
            .split(",")
            .map(item => {
              return "#" + item;
            })
            .join("")
        };
        this.setState({
          ...this.state,
          enrolmentData: {
            ...this.state.enrolmentData,
            info: info,
            stuff: this.props.stuffs
          },
          stuffID: this.props.stuffs.length,
          color_idx: "",
          images: this.props.photos,
          userID: this.state.userID,
          step: (
            <Step1
              onChangeCup={this.onChangeCup}
              onChangeAlcohol={this.onChangeAlcohol}
              onSaveName={this.onSaveName}
              onSaveDescribe={this.onSaveDescribe}
              onSaveTags={this.onSaveTags}
              info={info}
            />
          )
        });
      }
    }
  }

  onChangeStepStatus = event => {
    let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");
    let clickText = event.target.innerText.trim();

    stepTarget.forEach(val => {
      val.classList.remove(this.selectStep);
    });

    switch (clickText) {
      case "STEP 1":
        stepTarget[0].classList.add(this.selectStep);
        this.setState({
          left: <Left contents={this.contents[0]} />,
          middle: <Middle />,
          step: (
            <Step1
              onChangeCup={this.onChangeCup}
              onChangeAlcohol={this.onChangeAlcohol}
              onSaveName={this.onSaveName}
              onSaveDescribe={this.onSaveDescribe}
              onSaveTags={this.onSaveTags}
              info={this.state.enrolmentData.info}
            />
          )
        });
        break;
      case "STEP 2":
        stepTarget[1].classList.add(this.selectStep);
        this.setState({
          left: <Left contents={this.contents[1]} />,
          middle: <Middle />,
          step: (
            <Step2
              stuff={this.state.enrolmentData.stuff}
              idx={this.state.stuffID}
              onAddStuff={this.onAddStuff}
              onDeleteStuff={this.onDeleteStuff}
              onSaveStuffName={this.onSaveStuffName}
              onSaveStuffVolume={this.onSaveStuffVolume}
              onSelectColor={this.onSelectColor}
              validateNumber={this.validateNumber}
            />
          )
        });
        break;
      case "STEP 3":
        stepTarget[2].classList.add(this.selectStep);
        this.setState({
          left: <Left contents={this.contents[2]} />,
          middle: "",
          step: <Step3 saveImage={this.onSaveImages} />
        });
        break;
      default:
        break;
    }
  };

  onChangeCup = event => {
    let cupText = event.target.innerText.trim();
    this.changeCup(cupText);
  };

  changeCup = cupText => {
    let selectCup = "";
    let cupArea = document.querySelector("#cup-area");
    let cupTarget = document.querySelectorAll(
      ".cup-item1, .cup-item2, .cup-item3, .cup-item4, .cup-item5"
    );
    let enrolmentData = { ...this.state.enrolmentData };

    cupTarget.forEach(val => {
      if (val.classList.length === 2) {
        selectCup = val.classList[1];
        val.classList.remove(selectCup);
      }
    });

    switch (cupText) {
      case "하이볼":
        cupTarget[0].classList.add(selectCup);
        enrolmentData.info.cup = "하이볼";
        this.setState({ enrolmentData });

        cupArea.style.backgroundImage = `url(${cup_empty1})`;
        break;
      case "리큐르":
        cupTarget[1].classList.add(selectCup);
        enrolmentData.info.cup = "리큐르";
        this.setState({ enrolmentData });

        cupArea.style.backgroundImage = `url(${cup_empty2})`;
        break;
      case "허리케인":
        cupTarget[2].classList.add(selectCup);
        enrolmentData.info.cup = "허리케인";
        this.setState({ enrolmentData });

        cupArea.style.backgroundImage = `url(${cup_empty3})`;
        break;
      case "마가렛":
        cupTarget[3].classList.add(selectCup);
        enrolmentData.info.cup = "마가렛";
        this.setState({ enrolmentData });

        cupArea.style.backgroundImage = `url(${cup_empty4})`;
        break;
      case "마티니":
        cupTarget[4].classList.add(selectCup);
        enrolmentData.info.cup = "마티니";
        this.setState({ enrolmentData });

        cupArea.style.backgroundImage = `url(${cup_empty5})`;
        break;
      default:
        break;
    }
  };

  onChangeAlcohol = event => {
    let selectAlcohol = "";
    let alcoholTarget = document.querySelectorAll(".alcohol > li");
    let cupTarget =
      event.target.nodeName === "SPAN" ? event.target.parentNode : event.target;
    let enrolmentData = { ...this.state.enrolmentData };

    alcoholTarget.forEach(val => {
      if (val.classList.length === 2) {
        selectAlcohol = val.classList[1];
        val.classList.remove(selectAlcohol);
      }
    });

    if (alcoholTarget[0] === cupTarget) {
      alcoholTarget[0].classList.add(selectAlcohol);
      enrolmentData.info.alcohol = 0;
    } else if (alcoholTarget[1] === cupTarget) {
      alcoholTarget[1].classList.add(selectAlcohol);
      enrolmentData.info.alcohol = 1;
    } else if (alcoholTarget[2] === cupTarget) {
      alcoholTarget[2].classList.add(selectAlcohol);
      enrolmentData.info.alcohol = 2;
    } else if (alcoholTarget[3] === cupTarget) {
      alcoholTarget[3].classList.add(selectAlcohol);
      enrolmentData.info.alcohol = 3;
    } else if (alcoholTarget[4] === cupTarget) {
      alcoholTarget[4].classList.add(selectAlcohol);
      enrolmentData.info.alcohol = 4;
    }
  };

  onSaveName = event => {
    let enrolmentData = { ...this.state.enrolmentData };
    enrolmentData.info.name = event.target.value;
    this.setState({
      enrolmentData,
      step: (
        <Step1
          onChangeCup={this.onChangeCup}
          onChangeAlcohol={this.onChangeAlcohol}
          onSaveName={this.onSaveName}
          onSaveDescribe={this.onSaveDescribe}
          onSaveTags={this.onSaveTags}
          info={this.state.enrolmentData.info}
        />
      )
    });
    if (this.inputTarget) {
      this.inputTarget[0].value = event.target.value;
    }
  };

  onSaveDescribe = event => {
    let enrolmentData = { ...this.state.enrolmentData };
    enrolmentData.info.describe = event.target.value;
    this.setState({
      enrolmentData,
      step: (
        <Step1
          onChangeCup={this.onChangeCup}
          onChangeAlcohol={this.onChangeAlcohol}
          onSaveName={this.onSaveName}
          onSaveDescribe={this.onSaveDescribe}
          onSaveTags={this.onSaveTags}
          info={this.state.enrolmentData.info}
        />
      )
    });
  };

  onSaveTags = event => {
    let enrolmentData = { ...this.state.enrolmentData };
    enrolmentData.info.tags = event.target.value;
    this.setState({
      enrolmentData,
      step: (
        <Step1
          onChangeCup={this.onChangeCup}
          onChangeAlcohol={this.onChangeAlcohol}
          onSaveName={this.onSaveName}
          onSaveDescribe={this.onSaveDescribe}
          onSaveTags={this.onSaveTags}
          info={this.state.enrolmentData.info}
        />
      )
    });
  };

  onSaveStuffColor = (event, idx) => {
    let enrolmentData = { ...this.state.enrolmentData };
    enrolmentData.stuff[idx].name = event.target.value;
    this.setState({ enrolmentData });
  };

  onSaveStuffName = (event, idx) => {
    let enrolmentData = { ...this.state.enrolmentData };
    enrolmentData.stuff[idx].name = event.target.value;
    this.setState({ enrolmentData });
  };

  onSaveStuffVolume = (event, idx) => {
    let enrolmentData = { ...this.state.enrolmentData };
    let beforeVolume =
      enrolmentData.stuff[idx].ml === ""
        ? 0
        : parseInt(enrolmentData.stuff[idx].ml);
    const value = event.target.value ? parseInt(event.target.value) : 0;
    let afterVolume = value;

    enrolmentData.totalVolume -= beforeVolume;
    enrolmentData.totalVolume += afterVolume;
    enrolmentData.stuff[idx].ml = value;

    enrolmentData.stuff.forEach(val => {
      if (enrolmentData.totalVolume === 0) {
        val.ratio = 0;
      } else {
        val.ratio = Math.floor((val.ml / enrolmentData.totalVolume) * 100);
      }
    });
    this.setState({
      enrolmentData,
      step: (
        <Step2
          stuff={this.state.enrolmentData.stuff}
          idx={this.state.stuffID}
          onAddStuff={this.onAddStuff}
          onDeleteStuff={this.onDeleteStuff}
          onSaveStuffName={this.onSaveStuffName}
          onSaveStuffVolume={this.onSaveStuffVolume}
          onSelectColor={this.onSelectColor}
          validateNumber={this.validateNumber}
        />
      )
    });
  };

  onAddStuff = () => {
    let containerStyle = window.getComputedStyle
      ? getComputedStyle(document.querySelector("#stuff-container"), null)
      : document.querySelector("#stuff-container").currentStyle;
    let maxHegihtStyle = window.getComputedStyle
      ? getComputedStyle(
          document.querySelector("#stuff-container").parentElement,
          null
        )
      : document.querySelector("#stuff-container").parentElement.currentStyle;

    let containerHeight = parseInt(containerStyle.height);
    let maxHeight = parseInt(maxHegihtStyle.height);

    if (containerHeight + 62 >= maxHeight) {
      document.querySelector("#stuff-container").style.position = "relative";
    }

    let enrolmentData = { ...this.state.enrolmentData };
    let lastIndexID = this.state.stuffID;

    enrolmentData.stuff.push({
      color: "#4d191a",
      name: "",
      ml: "",
      ratio: 0
    });

    this.setState({
      enrolmentData,
      stuffID: lastIndexID++,
      step: (
        <Step2
          stuff={this.state.enrolmentData.stuff}
          idx={this.state.stuffID}
          onAddStuff={this.onAddStuff}
          onDeleteStuff={this.onDeleteStuff}
          onSaveStuffName={this.onSaveStuffName}
          onSaveStuffVolume={this.onSaveStuffVolume}
          onSelectColor={this.onSelectColor}
          validateNumber={this.validateNumber}
        />
      )
    });
  };

  onDeleteStuff = event => {
    let containerStyle = window.getComputedStyle
      ? getComputedStyle(document.querySelector("#stuff-container"), null)
      : document.querySelector("#stuff-container").currentStyle;
    let maxHegihtStyle = window.getComputedStyle
      ? getComputedStyle(
          document.querySelector("#stuff-container").parentElement,
          null
        )
      : document.querySelector("#stuff-container").parentElement.currentStyle;

    let containerHeight = parseInt(containerStyle.height);
    let maxHeight = parseInt(maxHegihtStyle.height);

    if (containerHeight - 62 <= maxHeight) {
      document.querySelector("#stuff-container").style.position = "absolute";
    }

    let enrolmentData = { ...this.state.enrolmentData };
    let clickIndex = event.target.parentNode.parentNode.parentNode.getAttribute(
      "stuff"
    );

    enrolmentData.stuff[clickIndex] = {};

    this.setState(enrolmentData);

    event.target.parentNode.parentNode.remove();
  };

  onSelectColor = event => {
    let colorContainer = document.querySelector("#color-picker");
    this.setState({'colorClose': colorContainer.classList[1]},
    () => {
      colorContainer.classList.remove(this.state.colorClose);
    });

    colorTarget = event.target.id;
  };

  onSelectColorClose = () => {
    let colorContainer = document.querySelector("#color-picker");
    let target = document.querySelector(`#${colorTarget}`);
    let targetNumber = target.getAttribute("stuff");
    let enrolmentData = { ...this.state.enrolmentData };
    let rgb = target.style.backgroundColor
      .replace(/^(rgb|rgba)\(/, "")
      .replace(/\)$/, "")
      .replace(/\s/g, "")
      .split(",");

    colorContainer.classList.add(this.state.colorClose);

    enrolmentData.stuff[targetNumber].color =
      "#" +
      (
        (1 << 24) +
        (parseInt(rgb[0]) << 16) +
        (parseInt(rgb[1]) << 8) +
        parseInt(rgb[2])
      )
        .toString(16)
        .slice(1);

    this.setState(enrolmentData);
  };

  onSaveImages = images => {
    this.setState({ images: images });
  };

  onSaveRecipe = () => {
    if (
      this.state.enrolmentData.info.name === "" ||
      this.state.enrolmentData.info.name === undefined
    ) {
      let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");
      stepTarget.forEach(val => {
        val.classList.remove(this.selectStep);
      });
      stepTarget[0].classList.add(this.selectStep);
      this.setState(
        {
          left: <Left contents={this.contents[0]} />,
          middle: <Middle />,
          step: (
            <Step1
              onChangeCup={this.onChangeCup}
              onChangeAlcohol={this.onChangeAlcohol}
              onSaveName={this.onSaveName}
              onSaveDescribe={this.onSaveDescribe}
              onSaveTags={this.onSaveTags}
              info={this.state.enrolmentData.info}
            />
          )
        },
        () => {
          document.getElementById("recipe-name").focus();
          alert("레시피 이름을 입력해주세요!");
        }
      );
    } else if (
      this.state.enrolmentData.info.describe === "" ||
      this.state.enrolmentData.info.describe === undefined
    ) {
      let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");
      stepTarget.forEach(val => {
        val.classList.remove(this.selectStep);
      });
      stepTarget[0].classList.add(this.selectStep);
      this.setState(
        {
          left: <Left contents={this.contents[0]} />,
          middle: <Middle />,
          step: (
            <Step1
              onChangeCup={this.onChangeCup}
              onChangeAlcohol={this.onChangeAlcohol}
              onSaveName={this.onSaveName}
              onSaveDescribe={this.onSaveDescribe}
              onSaveTags={this.onSaveTags}
              info={this.state.enrolmentData.info}
            />
          )
        },
        () => {
          document.getElementById("recipe-descripe").focus();
          alert("레시피 설명을 입력해주세요!");
        }
      );
    } else if (
      this.state.enrolmentData.info.tags === "" ||
      this.state.enrolmentData.info.tags === undefined
    ) {
      let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");
      stepTarget.forEach(val => {
        val.classList.remove(this.selectStep);
      });
      stepTarget[0].classList.add(this.selectStep);
      this.setState(
        {
          left: <Left contents={this.contents[0]} />,
          middle: <Middle />,
          step: (
            <Step1
              onChangeCup={this.onChangeCup}
              onChangeAlcohol={this.onChangeAlcohol}
              onSaveName={this.onSaveName}
              onSaveDescribe={this.onSaveDescribe}
              onSaveTags={this.onSaveTags}
              info={this.state.enrolmentData.info}
            />
          )
        },
        () => {
          document.getElementById("recipe-tag").focus();
          alert("레시피 태그를 입력해주세요!");
        }
      );
    } else {
      let stuffs = this.state.enrolmentData.stuff;
      for (let i = 0; i < stuffs.length; i++) {
        let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");

        if (stuffs[i].name === "") {
          stepTarget.forEach(val => {
            val.classList.remove(this.selectStep);
          });
          stepTarget[1].classList.add(this.selectStep);
          this.setState(
            {
              left: <Left contents={this.contents[1]} />,
              middle: <Middle />,
              step: (
                <Step2
                  stuff={this.state.enrolmentData.stuff}
                  idx={this.state.stuffID}
                  onAddStuff={this.onAddStuff}
                  onDeleteStuff={this.onDeleteStuff}
                  onSaveStuffName={this.onSaveStuffName}
                  onSaveStuffVolume={this.onSaveStuffVolume}
                  onSelectColor={this.onSelectColor}
                  validateNumber={this.validateNumber}
                />
              )
            },
            () => {
              let stuffElement = document.querySelectorAll(
                "#stuff-container > div"
              );
              console.log(
                stuffElement[
                  i
                ].childNodes[0].childNodes[0].childNodes[1].focus()
              );
              alert("재료 이름을 입력해주세요!");
            }
          );

          break;
        } else if (stuffs[i].ml === "") {
          stepTarget.forEach(val => {
            val.classList.remove(this.selectStep);
          });
          stepTarget[1].classList.add(this.selectStep);
          this.setState(
            {
              left: <Left contents={this.contents[1]} />,
              middle: <Middle />,
              step: (
                <Step2
                  stuff={this.state.enrolmentData.stuff}
                  idx={this.state.stuffID}
                  onAddStuff={this.onAddStuff}
                  onDeleteStuff={this.onDeleteStuff}
                  onSaveStuffName={this.onSaveStuffName}
                  onSaveStuffVolume={this.onSaveStuffVolume}
                  onSelectColor={this.onSelectColor}
                  validateNumber={this.validateNumber}
                />
              )
            },
            () => {
              let stuffElement = document.querySelectorAll(
                "#stuff-container > div"
              );
              console.log(
                stuffElement[
                  i
                ].childNodes[0].childNodes[0].childNodes[2].focus()
              );
              alert("재료 용량을 입력해주세요!");
            }
          );

          break;
        }
      }
    }

    let cup = this.state.enrolmentData.info.cup;
    if (cup === "하이볼") cup = 0;
    else if (cup === "리큐르") cup = 1;
    else if (cup === "허리케인") cup = 2;
    else if (cup === "마가렛") cup = 3;
    else cup = 4;

    //해쉬태그 분리
    let tags = this.state.enrolmentData.info.tags;

    const regexp = /\#[^#\s,;]+/g;
    tags = tags.match(regexp);
    if (tags) {
      tags = tags.map(item => {
        return item.replace("#", "")
      });
    }

    let data = {
      name: this.state.enrolmentData.info.name,
      glass: cup,
      percent: this.state.enrolmentData.info.alcohol,
      description: this.state.enrolmentData.info.describe,
      tag: tags,
      ingredient: this.state.enrolmentData.stuff,
      owner: this.state.userID
    };

    // TODO
    // 데이터 validation 체크 해야 함

    this.setState({'bLoading': true});
    this.props.enrolmentRequest(data);
  };

  onUploadImage = (images, id) => {
    let formData = new FormData();
    images.forEach(image => {
      formData.append("images", image);
      formData.append("timestamp", (Date.now() / 1000) | 0);
    });

    formData.append("id", id);

    axios
      .post(
        "http://ec2-18-191-88-64.us-east-2.compute.amazonaws.com:9000/recipe/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }
      )
      .then(response => {
        const data = response.data;
        // const fileURL = data.secure_url // You should store this URL for future references in your app
        console.log(id);
        console.log(data);

        this.setState({'bLoading': false});
        let done = document.getElementById('done-container');

        this.doneClose = done.classList[1];

        done.classList.remove(done.classList[1]);
      })
      .catch(e => {
        console.error(e);
      });
  };

  onDoneClose = () => {
    // let done = document.getElementById('done-container');
    // done.classList.add(this.doneClose);
    this.props.history.push("/");
  }

  handleChange = color => {
    let target = document.querySelector(`#${colorTarget}`);
    target.style.backgroundColor = color.hex;
  };

//   <div className={cx("loading_rect", !this.state.bLoading && "_hide")}>
//   <div className={cx("loading_container")}>
//     <CircleSpinner
//       size={100}
//       color="white"
//       loading={this.state.bLoading}
//     />
//   </div>
// </div>

  render() {
    const { left, middle, step, done } = this.state;

    return (
      <div className={cx("enrolment-container")}>
      
        

        <div id={"color-picker"} className={cx("color-picker", "close")}>
          <ChromePicker onChange={this.handleChange} />
          <span
            id={"color-picker-background"}
            className={cx("picker-background")}
            onClick={this.onSelectColorClose}
          />
        </div>

        <Header
          onChangeStepStatus={this.onChangeStepStatus}
          onSaveRecipe={this.onSaveRecipe}
        />

        <div className={cx("content")}>
          {left}

          {middle}

          {step}
        </div>

        {done}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Enrolment);
