import React from 'react';
import SlideOver from "./SlideOver";
import Header from "./Header";
import TableComponent from "./TableComponent";

function App() {

    const [isAddBottleOpen, setIsAddBottleOpen] = React.useState(false);
    const handleAddBottleClick = () => {
        console.log("Add Bottle button clicked (app)");
        setIsAddBottleOpen(true);
    };
    const handleCloseSlideOver = () => {
        console.log("Close SlideOver panel");
        setIsAddBottleOpen(false);
    };

    console.log("isAddBottleOpen:", isAddBottleOpen);


    return (
        <div className="App">
            <Header onAddBottleClick={handleAddBottleClick}/>
            <TableComponent/>
            <SlideOver isOpen={isAddBottleOpen} onClose={handleCloseSlideOver}/>
        </div>
    );
}

export default App;
