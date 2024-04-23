import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "../../components/header/header.component";
import ShareScore from "../../components/share/share.component";
import { fetchUsersStart } from "../../redux/user/user.actions";
import {
    selectIsFetching,
    selectUsersHash,
} from "../../redux/user/user.selectors";
import Spinner from "../../components/spinner/spinner.component";

const SharePage = () => {
    const { key } = useParams();
    const isFetching = useSelector(selectIsFetching);
    const dispatch = useDispatch();
    const usersHash = useSelector(selectUsersHash);
    console.log("key is ", key);
    console.log(isFetching);
    useEffect(() => {
        dispatch(fetchUsersStart());
    }, [dispatch]);

    return (
        <Fragment>
            <Header />
            {isFetching ? <Spinner /> : <ShareScore keyId={key} />}
        </Fragment>
    );
};

export default SharePage;
