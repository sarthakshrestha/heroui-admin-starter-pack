"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form, Fieldset } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    navigate("/dashboard");
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-primary-text display-card leading-tight">
            Sign in to Revolut
          </h1>
          <p className="text-base text-secondary-text font-read">
            Manage your business finances with ease.
          </p>
        </div>

        <Form
          className="flex flex-col gap-8"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-primary-text font-display font-medium text-sm">Email Address</span>
              <Input
                required
                className="h-12"
                classNames={{
                  inputWrapper: "bg-surface-featured rounded-pill border-none px-6 shadow-none hover:bg-surface-featured/80 transition-all h-12",
                  input: "text-base font-read",
                }}
                name="email"
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-primary-text font-display font-medium text-sm">Password</span>
                <Link className="text-revolut-blue hover:opacity-80 transition-opacity text-xs font-display font-medium" href="#">
                  Forgot password?
                </Link>
              </div>
              <Input
                required
                className="h-12"
                classNames={{
                  inputWrapper: "bg-surface-featured rounded-pill border-none px-6 shadow-none hover:bg-surface-featured/80 transition-all h-12",
                  input: "text-base font-read",
                }}
                name="password"
                placeholder="••••••••"
                type={isVisible ? "text" : "password"}
                endContent={
                  <button type="button" onClick={toggleVisibility} className="text-tertiary-text hover:text-primary-text transition-colors p-1">
                    <Icon
                      className="pointer-events-none text-xl"
                      icon={isVisible ? "lucide:eye-off" : "lucide:eye"}
                    />
                  </button>
                }
              />
            </div>
          </div>

          <Button 
            className="w-full bg-foreground text-background rounded-pill h-14 text-lg font-display font-medium hover:opacity-90 active:scale-[0.98] transition-all border-none shadow-none" 
            type="submit"
          >
            Continue
          </Button>
        </Form>

        <div className="flex flex-col items-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-tertiary-text">New to Revolut?</span>
            <Link href="#" className="text-revolut-blue font-display font-medium hover:underline">
              Create an account
            </Link>
          </div>
          
          <div className="flex gap-4">
            <button className="text-[11px] text-tertiary-text hover:text-primary-text transition-colors font-medium uppercase tracking-widest">Help</button>
            <button className="text-[11px] text-tertiary-text hover:text-primary-text transition-colors font-medium uppercase tracking-widest">Privacy</button>
            <button className="text-[11px] text-tertiary-text hover:text-primary-text transition-colors font-medium uppercase tracking-widest">Terms</button>
          </div>
        </div>
      </div>
    </div>
  );
}

