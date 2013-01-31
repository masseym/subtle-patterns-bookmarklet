// Generated by CoffeeScript 1.3.3
(function() {
  var SubtlePatternsBookmarklet,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  SubtlePatternsBookmarklet = (function() {
    "This is the bookmarklet the user see's and uses to control patterns. This could use\nKnockout or Angular, but since it's a bookmarklet we'll keep it light with jQuery";

    function SubtlePatternsBookmarklet(patterns) {
      this.patterns = patterns;
      this.category_patterns = __bind(this.category_patterns, this);

      this.update = __bind(this.update, this);

      this.curr = 0;
    }

    SubtlePatternsBookmarklet.prototype.setup = function(kwargs) {
      var i, pattern, _i, _len, _ref;
      if (kwargs == null) {
        kwargs = {};
      }
      "Handle initial setup outside of constructor";

      this.container = kwargs.container || "body";
      this.klass = kwargs.klass || "";
      this.create();
      this.setup_categories();
      this.setup_events();
      if (kwargs["default"]) {
        _ref = this.patterns;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          pattern = _ref[i];
          if (pattern.title === kwargs["default"]) {
            this.curr = i;
          }
        }
      }
      this.update();
      if (kwargs.callback) {
        return kwargs.callback();
      }
    };

    SubtlePatternsBookmarklet.prototype.show = function() {
      return this.el.show();
    };

    SubtlePatternsBookmarklet.prototype.hide = function() {
      return this.el.hide();
    };

    SubtlePatternsBookmarklet.prototype.create = function() {
      "Create the bookmarklet for the first time";
      this.el = $("<div id=\"subtlepatterns_bookmarklet\" class=\"" + this.klass + "\">\n    <div class=\"wrapper\">\n        <span class=\"title\">\n            <a href=\"#\" target=\"_blank\" class=\"name\"></a>\n        </span>\n        <div class=\"controls\">\n            <a href=\"#\" class=\"previous\"><img src=\"http://bradjasper.com/subtle-patterns-bookmarklet/left_arrow.png\" /></a>\n            <span class=\"counter\">\n                <span class=\"curr\"></span>/<span class=\"total\"></span>\n            </span>\n            <a href=\"#\" class=\"next\"><img src=\"http://bradjasper.com/subtle-patterns-bookmarklet/right_arrow.png\" /></a>\n        </div>\n        <div class=\"categories\">\n            <select class=\"category\">\n                <option value=\"all\">All (" + this.patterns.length + ")</option>\n            </select>\n        </div>\n        <div class=\"about\">\n            <a href=\"http://subtlepatterns.com/?utm_source=SubtlePatternsBookmarklet&utm_medium=web&utm_campaign=SubtlePatternsBookmarklet\" target=\"_blank\">SubtlePatterns</a> bookmarklet by\n            <a href=\"http://bradjasper.com/?utm_source=SubtlePatternsBookmarklet&utm_medium=web&utm_campaign=SubtlePatternsBookmarklet\" target=\"_blank\">Brad Jasper</a>\n        </div>\n    </div>\n</div>");
      return this.el.hide().appendTo(this.container).slideDown();
    };

    SubtlePatternsBookmarklet.prototype.current_pattern = function() {
      "Return the currently selected pattern";
      return this.category_patterns()[this.curr];
    };

    SubtlePatternsBookmarklet.prototype.update = function() {
      "Update the currently selected pattern. This is generally called on first\ninitialization and any time a next() or previous() call is made.";

      var description, pattern, pattern_link;
      pattern = this.current_pattern();
      $("body").css("background-image", "url('" + pattern.mirror_image + "')");
      $("body").css("background-repeat", "repeat");
      this.el.find(".curr").html("" + (this.curr + 1));
      this.el.find(".total").html("" + (this.category_patterns().length));
      pattern_link = "" + pattern.link + "?utm_source=SubtlePatternsBookmarklet&utm_medium=web&utm_campaign=SubtlePatternsBookmarklet";
      description = "" + pattern.description + " (" + (pattern.categories.join('/')) + ")";
      this.el.find(".title .name").attr("href", pattern_link).attr("title", description).html(pattern.title);
      return this.el.trigger("update");
    };

    SubtlePatternsBookmarklet.prototype.category_patterns = function() {
      "Return all of the patterns for the active category";

      var pattern, _i, _len, _ref, _ref1, _results;
      _ref = this.patterns;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pattern = _ref[_i];
        if (this.category === "all" || (_ref1 = this.category, __indexOf.call(pattern.categories, _ref1) >= 0)) {
          _results.push(pattern);
        }
      }
      return _results;
    };

    SubtlePatternsBookmarklet.prototype.setup_categories = function() {
      "Build the category <select> box";

      var category, count, key, pattern, select, sortable, val, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      this.categories = {};
      this.category = "all";
      _ref = this.patterns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pattern = _ref[_i];
        _ref1 = pattern.categories;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          category = _ref1[_j];
          if (category in this.categories) {
            this.categories[category] += 1;
          } else {
            this.categories[category] = 1;
          }
        }
      }
      sortable = (function() {
        var _ref2, _results;
        _ref2 = this.categories;
        _results = [];
        for (key in _ref2) {
          val = _ref2[key];
          _results.push([key, val]);
        }
        return _results;
      }).call(this);
      sortable.sort(function(b, a) {
        return a[1] - b[1];
      });
      select = this.el.find("select");
      _results = [];
      for (_k = 0, _len2 = sortable.length; _k < _len2; _k++) {
        _ref2 = sortable[_k], category = _ref2[0], count = _ref2[1];
        _results.push(select.append("<option value='" + category + "'>" + category + " (" + count + ")</option>"));
      }
      return _results;
    };

    SubtlePatternsBookmarklet.prototype.setup_events = function() {
      "Setup event handlers for all different actions";

      var _this = this;
      $(document).keydown(function(e) {
        switch (e.keyCode) {
          case 37:
            return _this.previous();
          case 39:
            return _this.next();
        }
      });
      this.el.find(".previous").click(function() {
        return _this.previous();
      });
      this.el.find(".next").click(function() {
        return _this.next();
      });
      return this.el.find("select").change(function() {
        _this.category = _this.el.find("select").val();
        _this.curr = 0;
        return _this.update();
      });
    };

    SubtlePatternsBookmarklet.prototype.next = function() {
      if (this.curr < this.category_patterns().length - 1) {
        this.curr += 1;
      } else {
        this.curr = 0;
      }
      return this.update();
    };

    SubtlePatternsBookmarklet.prototype.previous = function() {
      if (this.curr > 0) {
        this.curr -= 1;
      } else {
        this.curr = this.category_patterns().length - 1;
      }
      return this.update();
    };

    return SubtlePatternsBookmarklet;

  })();

  window.SubtlePatternsBookmarklet = SubtlePatternsBookmarklet;

}).call(this);