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
import { enrolmentRequest } from "../../action/enrolmentAction"

const cx = classNames.bind(styles);

const mapStateToProps = state => {
  return {
    state: state.enrolmentReducer.state,
    result: state.enrolmentReducer.result
  };
};

const mapDispatchToProps = { enrolmentRequest };

class Enrolment extends Component {
  constructor (props){
    super(props);
  
    this.state = {
      "left": "",
      "middle": "",
      "step": "",
      "done": "",
      "enrolmentData": {
        "info": {"cup": "하이볼", "name": "", "describe": "", "alcohol": 0, "tags" :""},
        "stuff": [
          {"color": "#4d191a", "name": "", "volume": "", "ratio": 0}
        ],
        "totalVolume": 0
      },
      "stuffID": 0,
      "color_idx": ""
    };
    
    this.onChangeStepStatus = this.onChangeStepStatus.bind(this);
    this.onChangeCup = this.onChangeCup.bind(this);
    this.onChangeCup = this.onChangeCup.bind(this);
    this.onChangeAlcohol = this.onChangeAlcohol.bind(this);
    this.onSaveDescribe = this.onSaveDescribe.bind(this);
    this.onSaveTags = this.onSaveTags.bind(this);
    this.onAddStuff = this.onAddStuff.bind(this);
    this.onSaveRecipe = this.onSaveRecipe.bind(this)
  
  }
  
  selectStep;
  selectCup;
  selectAlcohol;
  doneClose;
  contents;
  inputTarget;

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => {
      this.selectCup = document.querySelector(".cup-item1").classList[1];
      this.selectAlcohol = document.querySelector(".alcohol-item1").classList[1];
      this.doneClose = document.querySelector("#done-container").classList[1];

      this.inputTarget = document.querySelectorAll("#recipe-name, #recipe-descripe, #recipe-tag");
    });
    this.selectStep = document.querySelector(".step-1").classList[1];
    
    this.contents = [
      {"title" : "INPUT INFO", "detail" : "나만의 레시피 만들기 첫번째 단계! 레시피에 어울리는 컵을 선택하고, 정보를 입력해주세요."},
      {"title" : "PUT INGREDIENT", "detail" : "나만의 레시피 만들기 두번째 단계! 레시피에 들어갈 재료를 순서대로 추가하고, 완료되면 ‘Shake Me!’ 버튼을 클릭해주세요."},
      {"title" : "ADD PICUTRES", "detail" : "나만의 레시피 만들기 마지막 단계! 직접 만든 음료를 사진으로 찍어 등록하고, 썸네일 사진을 골라주세요."}
    ];

    this.setState({left: <Left
      contents={this.contents[0]}
    />});
    this.setState({middle: <Middle/>});
    this.setState({step: <Step1
      onChangeCup={this.onChangeCup}
      onChangeAlcohol={this.onChangeAlcohol}
      onSaveName={this.onSaveName}
      onSaveDescribe={this.onSaveDescribe}
      onSaveTags={this.onSaveTags}
      info={this.state.enrolmentData.info}
    />});
    this.setState({done: <Done
      onSaveRecipe={this.onSaveRecipe}  
    />});

  };

  onChangeStepStatus = event => {
    let stepTarget = document.querySelectorAll(".step-1, .step-2, .step-3");
    let clickText = event.target.innerText.trim();

    stepTarget.forEach(val => {
      val.classList.remove(this.selectStep);
    });

    switch (clickText) {
      case "STEP 1":
        stepTarget[0].classList.add(this.selectStep);
        this.setState({left: <Left
          contents={this.contents[0]}
        />});
        this.setState({middle: <Middle/>});
        this.setState({ step: <Step1
          onChangeCup={this.onChangeCup}
          onChangeAlcohol={this.onChangeAlcohol}
          onSaveName={this.onSaveName}
          onSaveDescribe={this.onSaveDescribe}
          onSaveTags={this.onSaveTags}
          info={this.state.enrolmentData.info}
        /> });
        break;
      case "STEP 2":
        stepTarget[1].classList.add(this.selectStep);
        this.setState({left: <Left
          contents={this.contents[1]}
        />});
        this.setState({ middle: <Middle/>});
        this.setState({ step: <Step2
          stuff={this.state.enrolmentData.stuff}
          idx={this.state.stuffID}
          onAddStuff={this.onAddStuff}
          onDeleteStuff={this.onDeleteStuff}
          onSaveStuffName={this.onSaveStuffName}
          onSaveStuffVolume={this.onSaveStuffVolume}
          onSelectColor={this.onSelectColor}
          validateNumber={this.validateNumber}
        /> });
        break;
      case "STEP 3":
        stepTarget[2].classList.add(this.selectStep);
        this.setState({left: <Left
          contents={this.contents[2]}
        />});
        this.setState({ middle: ""});
        this.setState({ step: <Step3/> });
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
    let cupTarget = document.querySelectorAll(".cup-item1, .cup-item2, .cup-item3, .cup-item4, .cup-item5");
    let enrolmentData = {...this.state.enrolmentData};

    cupTarget.forEach(val => {
      val.classList.remove(this.selectCup);
    });

    switch (cupText) {
      case "하이볼":
        cupTarget[0].classList.add(this.selectCup);
        enrolmentData.info.cup = "하이볼";
        this.setState({ enrolmentData });
        break;
      case "리큐르":
        cupTarget[1].classList.add(this.selectCup);
        enrolmentData.info.cup = "리큐르";
        this.setState({ enrolmentData });
        break;
      case "허리케인":
        cupTarget[2].classList.add(this.selectCup);
        enrolmentData.info.cup = "허리케인";
        this.setState({ enrolmentData });
        break;
      case "마가렛":
        cupTarget[3].classList.add(this.selectCup);
        enrolmentData.info.cup = "마가렛";
        this.setState({ enrolmentData });
        break;
      case "마티니":
        cupTarget[4].classList.add(this.selectCup);
        enrolmentData.info.cup = "마티니";
        this.setState({ enrolmentData });
        break;
      default:
        break;
    }
  };

  onChangeAlcohol = event => {
    let alcoholTarget = document.querySelectorAll(".alcohol > li");
    let cupTarget = event.target;
    let enrolmentData = {...this.state.enrolmentData};

    alcoholTarget.forEach(val => {
      val.classList.remove(this.selectAlcohol);
    })

    if (alcoholTarget[0] === cupTarget) {
      alcoholTarget[0].classList.add(this.selectAlcohol);
      enrolmentData.info.alcohol = 0;
    } else if (alcoholTarget[1] === cupTarget) {
      alcoholTarget[1].classList.add(this.selectAlcohol);
      enrolmentData.info.alcohol = 1;
    } else if (alcoholTarget[2] === cupTarget) {
      alcoholTarget[2].classList.add(this.selectAlcohol);
      enrolmentData.info.alcohol = 2;
    } else if (alcoholTarget[3] === cupTarget) {
      alcoholTarget[3].classList.add(this.selectAlcohol);
      enrolmentData.info.alcohol = 3;
    } else if (alcoholTarget[4] === cupTarget) {
      alcoholTarget[4].classList.add(this.selectAlcohol);
      enrolmentData.info.alcohol = 4;
    }
  };

  onSaveName = event => {
    let enrolmentData = {...this.state.enrolmentData};
    enrolmentData.info.name = event.target.value;
    this.setState({enrolmentData});

    this.inputTarget[0].value = event.target.value;
  };

  onSaveDescribe = event => {
    let enrolmentData = {...this.state.enrolmentData};
    enrolmentData.info.describe = event.target.value;
    this.setState({enrolmentData});
  };
  
  onSaveTags = event => {
    let enrolmentData = {...this.state.enrolmentData};
    enrolmentData.info.tags = event.target.value;
    this.setState({enrolmentData}); 
  };

  onSaveStuffColor = (event, idx) => {
    let enrolmentData = {...this.state.enrolmentData};
    enrolmentData.stuff[idx].name = event.target.value;
    this.setState({enrolmentData});
  };

  onSaveStuffName = (event, idx) => {
    let enrolmentData = {...this.state.enrolmentData};
    enrolmentData.stuff[idx].name = event.target.value;
    this.setState({enrolmentData});
  };

  onSaveStuffVolume = (event, idx) => {
    let enrolmentData = {...this.state.enrolmentData};
    let beforeVolume = enrolmentData.stuff[idx].volume === "" ? 0 : parseInt(enrolmentData.stuff[idx].volume);
    let afterVolume = parseInt(event.target.value);

    enrolmentData.totalVolume -= beforeVolume;
    enrolmentData.totalVolume += afterVolume;
    enrolmentData.stuff[idx].volume = event.target.value;

    enrolmentData.stuff.forEach(val => {
      val.ratio = Math.floor(val.volume / enrolmentData.totalVolume * 100);
    });

    this.setState({enrolmentData});

    this.setState({ step: <Step2
      stuff={this.state.enrolmentData.stuff}
      idx={this.state.stuffID}
      onAddStuff={this.onAddStuff}
      onDeleteStuff={this.onDeleteStuff}
      onSaveStuffName={this.onSaveStuffName}
      onSaveStuffVolume={this.onSaveStuffVolume}
      onSelectColor={this.onSelectColor}
      validateNumber={this.validateNumber}
    /> });
  };

  onAddStuff = () => {
    let enrolmentData = {...this.state.enrolmentData};
    let lastIndexID = this.state.stuffID;

    enrolmentData.stuff.push({"color": "#4d191a", "name": "", "volume": "", "ratio": 0});

    this.setState({enrolmentData});
    this.setState({stuffID: lastIndexID++});

    this.setState({ step: <Step2
      stuff={this.state.enrolmentData.stuff}
      idx={this.state.stuffID}
      onAddStuff={this.onAddStuff}
      onDeleteStuff={this.onDeleteStuff}
      onSaveStuffName={this.onSaveStuffName}
      onSaveStuffVolume={this.onSaveStuffVolume}
      onSelectColor={this.onSelectColor}
      validateNumber={this.validateNumber}
    /> });
  };

  onDeleteStuff = event => {
    let enrolmentData = {...this.state.enrolmentData};
    let clickIndex = event.target.parentNode.parentNode.parentNode.getAttribute("stuff");

    enrolmentData.stuff.splice(clickIndex, 1);

    this.setState(enrolmentData);

    event.target.parentNode.parentNode.parentNode.remove();
  }

  onSelectColor = event => {
    if (event.target.getAttribute("stuff")) {
      let colorNumber = event.target.getAttribute("stuff");
      this.setState({color_idx: colorNumber});

      document.querySelector(`#color-picker_${colorNumber}`).classList.toggle(this.doneClose);
    } else {
      let colorNumber = this.state.color_idx;
      let enrolmentData = {...this.state.enrolmentData};
      let rgb = document.querySelector(`#item-color_${colorNumber}`).style.backgroundColor.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');

      document.querySelector(`#color-picker_${colorNumber}`).classList.toggle(this.doneClose);

      enrolmentData.stuff[colorNumber].color = "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
      
      this.setState(enrolmentData);
      console.log(this.state);
    }
  };

  onSaveRecipe = () => {
    let doneView = document.querySelector("#done-container");
    let cup = this.state.enrolmentData.info.name;
    if (cup === '하이볼') cup = 0;
    else if (cup === '리큐르') cup = 1;
    else if (cup === '허리케인') cup = 2;
    else if (cup === '마가렛') cup = 3;
    else cup = 4;

    // let tag = this.state.enrolmentData.info.tags;
    
    //태그 배열 형태로 나누는거 처리해야 됨
    //재료 포멧은 정해야 될듯
    let data = {
      name: this.state.enrolmentData.info.name,
      glass: cup,
      percent: 50,
      description: this.state.enrolmentData.info.describe,
      tag: [],
      ingredient: [{
        "name" : "water",
        "color" : "blue",
        "ml" : 20
        }, {
        "name" : "hongcho",
        "color" : "red",
        "ml" : 10
        }],
      owner: '사용자'
    }

    // data.tag.push(tag);

    this.props.enrolmentRequest(data);

    doneView.classList.toggle(this.doneClose);
  };

  render() {
    const { left, middle, step, done } = this.state;

    return (
      <div className={cx("enrolment-container")}>

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
