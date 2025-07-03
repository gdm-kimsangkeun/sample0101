function loginWithKakao() {
	alert('서비스 준비중입니다.');return false;
    Kakao.Auth.login({
        success: function(authObj) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function(res) {
                    res.returnUrl = '<?=$curUrl?>';  // 로그인 페이지로 오기 직전 페이지 url
                    //console.log(res);
                    ajaxProc('','','/_Ext/snsLogin/kakao/kakaoLoginProc.php',res,loginChkEnd);
                },
                fail: function(error) {
                    //alert('login success, but failed to request user information: ' + JSON.stringify(error));
                    alert('로그인은 성공하였으나 사용자 정보를 가져오는데 실패하였습니다.');
                },
            })
        },
        fail: function(err) {
            alert(JSON.stringify(err));
        },
    })
}

// 카카오 로그아웃
function kakaoLogout() {
    if (!Kakao.Auth.getAccessToken()) {
        location.href="/_Prog/member/logout.php";
        return
    }
    Kakao.Auth.logout(function() {
        //alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
        location.href="/_Prog/member/logout.php"
    })
}


function loginChkEnd(v) {
    var vSplit = v.split('||');
    if (vSplit[0]=='OK') {
        alert('로그인되었습니다.');
//      location.href='/';
//        location.href=vSplit[1];
        location.reload();
    } else {
        alert(v);
    }
}

// 약관 동의 버튼
$(document).on('click','#joinAgreeFrm input[name=privacyPolicy], #joinAgreeFrm input[name=termOfUse]',function(){
    var isPrivacyChecked = $('#joinAgreeFrm input[name=privacyPolicy]').is(':checked');
    var isTermsChecked = $('#joinAgreeFrm input[name=termOfUse]').is(':checked');

    if (isPrivacyChecked && isTermsChecked) {
        $('#joinAgreeFrm #allAgree').prop('checked',true);
    } else {
        $('#joinAgreeFrm #allAgree').prop('checked',false);
    }
})

// 전체 약관 동의 버튼
$(document).on('click','#joinAgreeFrm #allAgree',function(){
    const checked = $(this).prop('checked');
    var isPrivacyChecked = $('#joinAgreeFrm input[name=privacyPolicy]').prop('checked',checked);
    var isTermsChecked = $('#joinAgreeFrm input[name=termOfUse]').prop('checked',checked);
})

// 동의 후 다음 버튼
$(document).on('click','#joinAgreeFrm #goJoin2',function(){
    var isPrivacyChecked = $('#joinAgreeFrm input[name=privacyPolicy]').is(':checked');
    var isTermsChecked = $('#joinAgreeFrm input[name=termOfUse]').is(':checked');

    if(!isPrivacyChecked) {
        alert('개인정보처리방침에 동의해주세요.');
        return false;
    }

    if(!isTermsChecked) {
        alert('이용약관에 동의해주세요.');
        return false;
    }

    openModal('join02','','','','','joinAgreeFrm');
});




















// 중복확인
$(document).on('click','#joinFrm #useridCheckBtn',function(){
    const loginUserid = $('#joinFrm input[name=loginUserid]').val();
    if(loginUserid == '') {
        alert('아이디를 입력해주세요.');
        $('#joinFrm input[name=loginUserid]').focus();
        return false;
    }

    var userIdPattern = /^[a-zA-Z0-9]+$/;
    if (!userIdPattern.test(loginUserid)) {
        alert('ID는 영문과 숫자만 입력 가능합니다.');
        $('#joinFrm input[name=loginUserid]').focus();
        return false;
    }

    const pa = 'loginUserid='+loginUserid;
    ajaxJsonProc('','','/_Prog/member/useridDblChk.php',pa,function(res) {
        if(res.msg != undefined && res.msg != '') {
            alert(res.msg);
        }

        if(res.success) {
            $('#joinFrm #idCheck').val('Y');
            $('#joinFrm #checkedLoginUserId').val(res.checkedLoginUserid);
        } else {
            $('#joinFrm #idCheck').val('N');
            $('#joinFrm #checkedLoginUserId').val('');
        }
    })
})

// 비밀번호 양식 체크
$(document).on('input','#joinFrm input[name=passwd], #joinFrm #passwdCheck',function(){
    var password = $('#joinFrm input[name=passwd]').val();
    var passwdCheck = $('#joinFrm #passwdCheck').val();
    var passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    // 유효
    if (passwordPattern.test(password)) {
        $('#joinFrm input[name=passwd]').closest('.pwd').removeClass('wrong').addClass('correct');
        if(password == passwdCheck) {
            $('#joinFrm #passwdCheck').closest('.pwd').removeClass('wrong').addClass('correct');
        } else {
            $('#joinFrm #passwdCheck').closest('.pwd').removeClass('correct').addClass('wrong');
        }
    } else {
        $('#joinFrm input[name=passwd], #joinFrm #passwdCheck').closest('.pwd').removeClass('correct').addClass('wrong');
    }
})

//가입하기 버튼
$(document).on('click','#joinCheckBtn',function(){
    if($('#joinFrm input[name=loginUserid]').val() == '') {
        alert('아이디를 입력해주세요.');
        $('#joinFrm input[name=loginUserid]').focus();
        return false;
    }

    var userIdPattern = /^[a-zA-Z0-9]+$/;
    var userId = $('#joinFrm input[name=loginUserid]').val();

    if (!userIdPattern.test(userId)) {
        alert('ID는 영문과 숫자만 입력 가능합니다.');
        $('#joinFrm input[name=loginUserid]').focus();
        return false;
    }

    if($('#joinFrm #idCheck').val() != 'Y' || $('#joinFrm #checkedLoginUserId').val() != $('#joinFrm input[name=loginUserid]').val()) {
        alert('아이디 중복확인을 해주세요.');
        return false;
    }
	
	if($('#joinFrm input[name=passwd]').val() == '') {
        alert('비밀번호를 입력해주세요.');
        $('#joinFrm input[name=passwd]').focus();
        return false;
    }
	
	
	
	
    if($('#joinFrm input[name=usernm]').val() == '') {
        alert('이름을 입력해주세요.');
        $('#joinFrm input[name=usernm]').focus();
        return false;
    }

    if($('#joinFrm input[name=email]').val() == '') {
        alert('이메일을 입력해주세요.');
        $('#joinFrm input[name=email]').focus();
        return false;
    }

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test($('#joinFrm input[name=email]').val())) {
        alert('이메일을 형식을 확인해주세요.');
        $('#joinFrm input[name=email]').focus();
        return false;
    }
    /*
    if($('#joinFrm input[name=phoneNum]').val() == '') {
        alert('휴대폰번호를 입력해주세요.');
        $('#joinFrm input[name=phoneNum]').focus();
        return false;
    }
    */
    var phonePattern = /^01[016789]-\d{3,4}-\d{4}$/;
    if ($('#joinFrm input[name=phoneNum]').val() != '' && !phonePattern.test($('#joinFrm input[name=phoneNum]').val())) {
        alert('휴대폰 번호 형식을 확인해주세요.');
        $('#joinFrm input[name=phoneNum]').focus();
        return false;
    }

    if($('#joinFrm input[name=birth]').val() != '' && $('#joinFrm input[name=birth]').val().length < 6) {
        alert('입력하신 생년월일이 유효하지 않습니다.');
        $('#joinFrm input[name=birth]').focus();
        return false;
    }

    ajaxJsonProc('','joinFrm','/_Prog/member/memberProc.php','',function(res){
        if(res.msg != undefined && res.msg != '') {
            alert(res.msg);
        }

        if(res.success) {
            openModal('join03');
        }
    })
})

// 가입 폼 닫기 버튼
$(document).on('click','#joinFrmCloseBtn',function(){
    let isAnyInputFilled = false;
    $('#joinFrm input[type="text"]').each(function() {
        if ($(this).val().trim() !== '') {
            isAnyInputFilled = true;
            return false; // 루프를 종료합니다.
        }
    });

    if (isAnyInputFilled) {
        if(confirm('회원가입을 취소하시겠습니까? 입력하신 내용은 모두 초기화됩니다.')) {
            modalClose();
        }
    } else {
        modalClose();
    }
})

// 로그인
$(document).on('click','#loginBtn',function(){
    const loginUserid = $('#loginFrm input[name=loginUserid]').val();
    const passwd = $('#loginFrm input[name=passwd]').val();

    if(loginUserid == '') {
        alert('아이디를 입력해주세요.');
        return false;
    }

    if(passwd == '') {
        alert('비밀번호를 입력해주세요.');
        return false;
    }

    ajaxJsonProc('','loginFrm','/_Prog/member/loginProc.php','', function(res){
        if(res.msg != undefined && res.msg != '') {
            alert(res.msg);
        }

        if(res.success) {
            location.reload();
        }
    });
})


// 아이디 찾기
$(document).on('click','#findIdBtn',function(){
    const usernm = $('#findIdFrm input[name=usernm]').val();
    const phoneNum = $('#findIdFrm input[name=phoneNum]').val();
    const email = $('#findIdFrm input[name=email]').val();

    if(usernm == '') {
        alert('이름을 입력해주세요.');
        return false;
    }
    /*
    if(phoneNum == '') {
        alert('휴대폰 번호를 입력해주세요.');
        return false;
    }
    */
    if(email == '') {
        alert('이메일을 입력해주세요.');
        return false;
    }

    ajaxJsonProc('','findIdFrm','/_Prog/member/findProc.php','',function(res) {
        if(res.msg != undefined && res.msg != '') {
            alert(res.msg);
        }
        
        if(res.success) {
            openModal('chkId','','','','userid='+res.userid,'');
        }
    })
})

// 임시비밀번호 발급
$(document).on('click','#passwdResetBtn',function(){
    ajaxJsonProc('','passwdResetFrm','/_Prog/member/passwdResetProc.php','',function(res) {
        if(res.msg != undefined && res.msg != '') {
            alert(res.msg);
        }

        if(res.success) {
            openModal('login01');
        }
    })
})



// 임시비밀번호 발급
$(document).on('click','#passwdChangeBtn',function(){

    var password = $('#passwdChangeFrm input[name=passwd]').val();
    var passwdCheck = $('#passwdChangeFrm #passwdCheck').val();
    var passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    // 유효
    if (passwordPattern.test(password)) {
        if(password == passwdCheck) {
            ajaxJsonProc('','passwdChangeFrm','/_Prog/member/memberProc.php','',function(res) {
                if(res.msg != undefined && res.msg != '') {
                    alert(res.msg);
                }

                if(res.success) {
                    openModal('login02');
                }
            })
        } else {
            alert("비밀번호 확인 값이 일치하지 않습니다.");
            return false;
        }
    } else {
        alert("비밀번호는 영문,숫자,특수문자 포함 8자리 이상 입력해주세요.");
        return false;
    }



})





function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                //document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                //document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}
