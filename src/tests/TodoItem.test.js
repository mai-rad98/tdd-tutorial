import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import mockData from "../mockData";

describe('<TodoItem /> tests', () => {
    it('should render todo item properly', () => {
        render(<TodoItem todo={mockData[0]} />);
        const title = screen.getByText(/eat breakfast/i);
        expect(title).toBeInTheDocument();
        const button = screen.getByTestId('close-btn-1');
        expect(button).toBeInTheDocument();
    })

    it('should render todo item with checkbox', () => {
        render(<TodoItem todo={mockData[0]} />);
        expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
        expect(screen.getByText(/eat breakfast/i)).toBeInTheDocument()
    })
})
