"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form } from "@heroui/react";
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
    <div className="min-h-screen flex items-center justify-center bg-marketing-black">
      <div className="rounded-xl bg-panel-dark border border-white/5 flex w-full max-w-sm flex-col gap-6 px-8 pt-10 pb-12 shadow-level-5 backdrop-blur-xl">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary-text text-2xl text-left font-signature tracking-tight">
            Log in to your account
          </h2>
          <p className="text-sm text-tertiary-text text-left font-regular">
            Please enter your details
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            className="text-primary-text"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="primary"
            classNames={{
              inputWrapper: "bg-white/5 border border-white/5 data-[hover=true]:bg-white/8 transition-all h-11 shadow-none",
              label: "text-tertiary-text font-signature",
              input: "placeholder:text-quaternary-text"
            }}
          />
          <Input
            isRequired
            className="text-primary-text"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="primary"
            classNames={{
              inputWrapper: "bg-white/5 border border-white/5 data-[hover=true]:bg-white/8 transition-all h-11 shadow-none",
              label: "text-tertiary-text font-signature",
              input: "placeholder:text-quaternary-text"
            }}
            endContent={
              <button type="button" onClick={toggleVisibility} className="text-quaternary-text hover:text-tertiary-text transition-colors">
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-xl"
                    icon="lucide:eye-off"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-xl"
                    icon="lucide:eye"
                  />
                )}
              </button>
            }
          />
          <div className="flex w-full items-center justify-between px-1 py-1">
            <Checkbox name="remember" classNames={{ label: "text-tertiary-text font-regular text-sm" }}>
              Remember me
            </Checkbox>
            <Link className="text-tertiary-text hover:text-primary-text transition-colors text-sm" href="#">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full bg-brand-indigo hover:bg-accent-hover text-white font-signature h-11 rounded-lg mt-2 shadow-none transition-all active:scale-95" type="submit">
            Sign In
          </Button>
        </Form>
        {/* <p className="text-small text-center">
          Need to create an account?&nbsp;
          <Link href="#" size="sm">
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
}
