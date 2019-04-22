const Layout = (props) =>{
        return(
                <div>
                        <table>
                                <tr>
                                        <td><a href="/">Home</a></td>
                                        <td><a href="/create">Create</a></td>
                                </tr>
                        </table>
                {props.children}
                </div>
        );
};

export default Layout;
