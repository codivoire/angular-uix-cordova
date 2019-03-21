import { Injectable, InjectionToken } from "@angular/core";
import * as i0 from "@angular/core";
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.prototype.get = function (key, fallback) {
        var c = getConfig();
        if (c) {
            return c.get(key, fallback);
        }
        return null;
    };
    Config.prototype.getBoolean = function (key, fallback) {
        var c = getConfig();
        if (c) {
            return c.getBoolean(key, fallback);
        }
        return false;
    };
    Config.prototype.getNumber = function (key, fallback) {
        var c = getConfig();
        if (c) {
            return c.getNumber(key, fallback);
        }
        return 0;
    };
    Config.prototype.set = function (key, value) {
        var c = getConfig();
        if (c) {
            c.set(key, value);
        }
    };
    Config.decorators = [
        { type: Injectable, args: [{
                    providedIn: "root"
                },] }
    ];
    Config.ngInjectableDef = i0.defineInjectable({ factory: function Config_Factory() { return new Config(); }, token: Config, providedIn: "root" });
    return Config;
}());
export { Config };
export var ConfigToken = new InjectionToken("USERCONFIG");
function getConfig() {
    if (typeof window !== "undefined") {
        var UIX = window.UIX;
        if (UIX && UIX.config) {
            return UIX.config;
        }
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdWl4LyIsInNvdXJjZXMiOlsibGliL3Byb3ZpZGVycy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNEO0lBQUE7S0FrQ0M7SUE5QkMsb0JBQUcsR0FBSCxVQUFJLEdBQW9CLEVBQUUsUUFBYztRQUN0QyxJQUFNLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsR0FBb0IsRUFBRSxRQUFrQjtRQUNqRCxJQUFNLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCwwQkFBUyxHQUFULFVBQVUsR0FBb0IsRUFBRSxRQUFpQjtRQUMvQyxJQUFNLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxvQkFBRyxHQUFILFVBQUksR0FBb0IsRUFBRSxLQUFXO1FBQ25DLElBQU0sQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDOztnQkFqQ0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O2lCQUpEO0NBb0NDLEFBbENELElBa0NDO1NBL0JZLE1BQU07QUF1Q25CLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBTSxZQUFZLENBQUMsQ0FBQztBQUVqRSxTQUFTLFNBQVM7SUFDaEIsSUFBSSxPQUFRLE1BQWMsS0FBSyxXQUFXLEVBQUU7UUFDMUMsSUFBTSxHQUFHLEdBQUksTUFBYyxDQUFDLEdBQUcsQ0FBQztRQUVoQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztTQUNuQjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gIGdldChrZXk6IGtleW9mIFVJWGNvbmZpZywgZmFsbGJhY2s/OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGMgPSBnZXRDb25maWcoKTtcbiAgICBpZiAoYykge1xuICAgICAgcmV0dXJuIGMuZ2V0KGtleSwgZmFsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldEJvb2xlYW4oa2V5OiBrZXlvZiBVSVhjb25maWcsIGZhbGxiYWNrPzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGMgPSBnZXRDb25maWcoKTtcbiAgICBpZiAoYykge1xuICAgICAgcmV0dXJuIGMuZ2V0Qm9vbGVhbihrZXksIGZhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TnVtYmVyKGtleToga2V5b2YgVUlYY29uZmlnLCBmYWxsYmFjaz86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IGdldENvbmZpZygpO1xuICAgIGlmIChjKSB7XG4gICAgICByZXR1cm4gYy5nZXROdW1iZXIoa2V5LCBmYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgc2V0KGtleToga2V5b2YgVUlYY29uZmlnLCB2YWx1ZT86IGFueSkge1xuICAgIGNvbnN0IGMgPSBnZXRDb25maWcoKTtcbiAgICBpZiAoYykge1xuICAgICAgYy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVUlYY29uZmlnIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICB2ZXJzaW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBDb25maWdUb2tlbiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KFwiVVNFUkNPTkZJR1wiKTtcblxuZnVuY3Rpb24gZ2V0Q29uZmlnKCk6IGFueSB7XG4gIGlmICh0eXBlb2YgKHdpbmRvdyBhcyBhbnkpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgVUlYID0gKHdpbmRvdyBhcyBhbnkpLlVJWDtcblxuICAgIGlmIChVSVggJiYgVUlYLmNvbmZpZykge1xuICAgICAgcmV0dXJuIFVJWC5jb25maWc7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuIl19